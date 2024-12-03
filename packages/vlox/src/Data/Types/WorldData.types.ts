export class PaintVoxelData {
  static Create(data: Partial<PaintVoxelData>) {
    return new PaintVoxelData(
      data.id,
      data.mod,
      data.shapeState,
      data.level,
      data.levelState,
      data.secondaryVoxelId
    );
  }
  private constructor(
    public id: string = "dve_air",
    public mod:number = 0,
    public shapeState: number = 0,
    public level: number = 0,
    public levelState: number = 0,
    public secondaryVoxelId: string = "dve_air"
  ) {}
}
