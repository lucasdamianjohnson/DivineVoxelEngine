//util
import { Util } from "../../Global/Util.helper.js";
//tools
import { BrushTool } from "./Brush.js";
import { TasksTool } from "../Tasks/TasksTool.js";
const tasks = TasksTool();
export const GetAdvancedBrushTool = () => {
    let brush = Util.merge(new BrushTool(), {
        paintAndAwaitUpdate() {
            const self = this;
            return new Promise((resolve) => {
                self.paintAndUpdate(() => {
                    resolve(true);
                });
            });
        },
        eraseAndAwaitUpdate() {
            const self = this;
            return new Promise((resolve) => {
                self.eraseAndUpdate(() => {
                    resolve(true);
                });
            });
        },
        paintAndUpdate(onDone) {
            tasks.setFocalPoint(brush.location);
            const [dimesnion, x, y, z] = brush.location;
            tasks.voxelUpdate.paint.add(x, y, z, brush.getRaw());
            tasks.voxelUpdate.paint.run(() => (onDone ? onDone() : false));
        },
        eraseAndUpdate(onDone) {
            tasks.setFocalPoint(brush.location);
            const [dimesnion, x, y, z] = brush.location;
            tasks.voxelUpdate.erase.add(x, y, z);
            tasks.voxelUpdate.erase.run(() => (onDone ? onDone() : false));
        },
        explode(radius = 6, onDone) {
            tasks.setFocalPoint(brush.location);
            const [dimesnion, x, y, z] = brush.location;
            tasks.explosion.run.add(x, y, z, radius);
            tasks.explosion.run.run(() => {
                tasks.build.chunk.run(() => (onDone ? onDone() : 0));
            });
        },
    });
    return brush;
};
