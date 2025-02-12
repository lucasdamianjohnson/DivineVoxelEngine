import { VoxelLightData } from "./VoxelLightData";
import { VoxelLevelReader } from "./VoxelLevelReader";
import { VoxelTagStates } from "../Data/VoxelTagStates";
import { RawVoxelData } from "../Types/Voxel.types";
import {
  VoxelSubstanceTags,
  VoxelTagIds,
  VoxelTags,
} from "../../Voxels/Data/VoxelTag.types";
import { VoxelTagsRegister } from "../../Voxels/Data/VoxelTagsRegister";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { VoxelLogicRegister } from "../../Voxels/Logic/VoxelLogicRegister";
interface WritableArrayLike<T> {
  length: number;
  [index: number]: T;
}
export abstract class VoxelCursorInterface {
  _loadedId = 0;
  id = 0;
  secondaryId = 0;

  _tags: VoxelTags = {} as any;
  _substanceTags: VoxelSubstanceTags = {} as any;
  __secondary = false;

  // private _section: Section;
  _index = 0;

  abstract ids: WritableArrayLike<number>;
  abstract light: WritableArrayLike<number>;
  abstract level: WritableArrayLike<number>;
  abstract secondary: WritableArrayLike<number>;

  /**
   *
   * @param mode 0 for add 1 for remove 2 for the voxel needs a buried and logic check only
   */
  abstract updateVoxel(mode: 0 | 1 | 2): void;
  _lightData = new VoxelLightData();

  process() {
    this.id = this.ids[this._index];
    this.secondaryId = this.secondary[this._index];

    this._loadedId = this.getId();

    this._tags = VoxelTagsRegister.VoxelTags[this.getVoxelId()];

    this._substanceTags =
      VoxelTagsRegister.SubstanceStags[
        VoxelPalettesRegister.substance.getNumberId(
          this._tags["dve_substance"]!
        )
      ];
  }

  abstract loadIn(): void;

  setSecondary(enable: boolean) {
    this.__secondary = enable;
    this._loadedId = this.getId();
    return this;
  }
  getRenderedMaterial() {
    return this._tags[VoxelTagIds.renderedMaterial];
  }

  getMaterial() {
    return this._tags[VoxelTagIds.voxelMaterial];
  }

  checkCollisions() {
    return this._tags[VoxelTagIds.checkCollisions];
  }
  getCollider() {
    return this._tags[VoxelTagIds.colliderID];
  }

  getSubstance() {
    return this._tags[VoxelTagIds.substance];
  }
  getSubstanceData() {
    return this._substanceTags;
  }
  isOpaque() {
    return !this._tags[VoxelTagIds.isTransparent];
  }

  getLevel() {
    return VoxelLevelReader.getLevel(this.level[this._index]);
  }
  setLevel(level: number) {
    this.level[this._index] = VoxelLevelReader.setLevel(
      this.level[this._index],
      level
    );
    return this;
  }
  getLevelState() {
    return VoxelLevelReader.getLevelState(this.level[this._index]);
  }
  setLevelState(state: number) {
    this.level[this._index] = VoxelLevelReader.setLevelState(
      this.level[this._index],
      state
    );
    return this;
  }

  hasSecondaryVoxel() {
    return this.secondaryId > 1;
  }
  canHaveSecondaryVoxel() {
    return this._tags[VoxelTagIds.canHaveSecondary];
  }
  hasRGBLight() {
    const light = this.getLight();
    if (light <= 0) false;
    return this._lightData.hasRGBLight(light);
  }
  hasSunLight() {
    const light = this.getLight();
    if (light <= 0) false;
    return this._lightData.hasSunLight(light);
  }

  getLight() {
    if (this._loadedId == 0) return this.light[this._index];
    if (this.isOpaque()) {
      if (this.isLightSource()) {
        return this._tags[VoxelTagIds.lightValue] as number;
      }
      return -1;
    }
    if (this.isLightSource()) {
      return this._lightData.mixLight(
        this.light[this._index],
        this._tags[VoxelTagIds.lightValue] as number
      );
    }
    return this.light[this._index];
  }

  setLight(light: number) {
    this.light[this._index] = light;
    return this;
  }

  isLightSource() {
    if (this._loadedId <= 0) return false;
    if (
      VoxelLogicRegister.voxels[this._loadedId]?.hasTag(
        VoxelTagIds.isLightSource
      )
    ) {
      return VoxelLogicRegister.voxels[this._loadedId].getTagValue(
        VoxelTagIds.isLightSource,
        this
      );
    }
    return VoxelTagStates.isRegistered(
      this._loadedId,
      VoxelTagIds.isLightSource
    )
      ? VoxelTagStates.getValue(
          this._loadedId,
          VoxelTagIds.isLightSource,
          this.getState()
        ) === true
      : this._tags[VoxelTagIds.isLightSource];
  }

  doesVoxelAffectLogic() {
    if (
      this._tags["dve_can_be_powered"] ||
      this._tags["dve_can_hold_power"] ||
      this._tags["dve_can_carry_power"] ||
      this._tags["dve_is_power_source"]
    )
      return true;

    return false;
  }

  getLightSourceValue() {
    if (this._loadedId <= 0) return 0;
    return this._tags[VoxelTagIds.lightValue] as number;
  }

  getPower() {
    if (this._loadedId == 0) return -1;
    if (this._substanceTags["dve_is_liquid"]) return -1;
    if (
      !this._tags["dve_can_carry_power"] &&
      !this._tags["dve_can_hold_power"] &&
      !this._tags["dve_can_be_powered"] &&
      !this._tags["dve_is_power_source"]
    )
      return -1;
    const level = VoxelLevelReader.getLevel(this.level[this._index]);
    if (
      this._tags["dve_is_power_source"] &&
      this._tags["dve_power_value"] > level
    )
      return this._tags["dve_power_value"];
    return level;
  }

  setPower(level: number) {
    this.level[this._index] = VoxelLevelReader.setLevel(
      this.level[this._index],
      level
    );
    return this;
  }

  isPowerSource() {
    if (this._loadedId <= 0) return false;
    return VoxelTagStates.isRegistered(
      this._loadedId,
      VoxelTagIds.isPowerSource
    )
      ? VoxelTagStates.getValue(
          this._loadedId,
          VoxelTagIds.isPowerSource,
          this.getState()
        ) === true
      : this._tags[VoxelTagIds.isPowerSource];
  }

  getPowerSourceValue() {
    if (this._loadedId <= 0) return 0;
    return this._tags[VoxelTagIds.powerValue] as number;
  }

  noAO() {
    if (this._loadedId <= 0) return false;
    return this._tags[VoxelTagIds.noAO];
  }
  isRenderable() {
    if (this.id > 0) return true;
    if (this.canHaveSecondaryVoxel() && this.secondary[this._index] > 0)
      return true;
    return false;
  }
  isAir() {
    return 0 == this.ids[this._index];
  }
  setAir() {
    this.ids[0] = 0;
    return this;
  }

  getId() {
    if (this.__secondary) {
      return this.secondaryId;
    }
    return this.id;
  }
  setId(id: number) {
    if (this.__secondary) {
      this.secondary[this._index] = id;
      return this;
    }
    this.ids[this._index] = id;
    return this;
  }
  getVoxelId() {
    return this.getIndexData()[0];
  }
  setVoxelId(id: number, state = 0, mod = 0) {
    return this.setId(VoxelPalettesRegister.getVoxelId(id, state, mod));
  }

  setStringId(id: string, state = 0, mod = 0) {
    return this.setVoxelId(
      VoxelPalettesRegister.voxelIds.getNumberId(id),
      state,
      mod
    );
  }
  getStringId() {
    return VoxelPalettesRegister.voxelIds.getStringId(this.getIndexData()[0]);
  }

  setName(name: string, state = 0, mod = 0) {
    return this.setVoxelId(
      VoxelPalettesRegister.voxelIds.getNumberId(
        VoxelPalettesRegister.voxelNametoIdMap.get(name)!
      ),
      state,
      mod
    );
  }

  getName() {
    return VoxelPalettesRegister.voxelIdToNameMap.get(this.getStringId())!;
  }
  getIndexData() {
    if (this.__secondary) {
      return VoxelPalettesRegister.voxels[this.secondary[this._index]];
    }
    return VoxelPalettesRegister.voxels[this.ids[this._index]];
  }

  getMod() {
    return VoxelPalettesRegister.voxels[this.ids[this._index]][2];
  }
  setMod(mod: number) {
    const index = VoxelPalettesRegister.voxels[this.ids[this._index]];
    this.setId(VoxelPalettesRegister.getVoxelId(index[0], index[1], mod));
    return this;
  }
  getState() {
    return this.getIndexData()[1];
  }
  setState(state: number) {
    const index = this.getIndexData();
    this.setId(VoxelPalettesRegister.getVoxelId(index[0], state, index[2]));
    return this;
  }

  isSameVoxel(voxel: VoxelCursorInterface) {
    return this.getIndexData()[0] == voxel.getIndexData()[0];
  }
  copy(cursor: VoxelCursorInterface) {
    this.ids[this._index] = cursor.ids[cursor._index];
    this.light[this._index] = cursor.light[cursor._index];
    this.level[this._index] = cursor.level[cursor._index];
    this.secondary[this._index] = cursor.secondary[cursor._index];
    return this;
  }

  copyRaw(raw: RawVoxelData) {
    this.ids[this._index] = raw[0];
    this.light[this._index] = raw[1];
    this.level[this._index] = raw[2];
    this.secondary[this._index] = raw[3];
    return this;
  }

  getRaw(): RawVoxelData {
    return [
      this.ids[this._index],
      this.light[this._index],
      this.level[this._index],
      this.secondary[this._index],
    ];
  }

  getRawToRef(raw: RawVoxelData): RawVoxelData {
    raw[0] = this.ids[this._index];
    raw[1] = this.light[this._index];
    raw[2] = this.level[this._index];
    raw[3] = this.secondary[this._index];
    return raw;
  }
}
