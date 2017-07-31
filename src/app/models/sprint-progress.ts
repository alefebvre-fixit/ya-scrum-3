import { StoryProgress } from './story-progress';

export class SprintProgress {


    date: Date;
    day = 1;
    total = 0;
    previous = 0;
    daily = 0;
    remaining = 0;

    sprintId: string;
    storiesProgress: StoryProgress[];


    public static reset(progress: SprintProgress) {
        progress.previous = 0;
        progress.daily = 0;
        progress.total = 0;
        progress.remaining = 0;
    }

    public static setProgress(sprintProgress: SprintProgress, storyProgress: StoryProgress) {

        if (storyProgress.storyId === undefined) {
            return;
        }

        if (sprintProgress.storiesProgress === undefined) {
            sprintProgress.storiesProgress = new Array<StoryProgress>();
        }


        const index: number = sprintProgress.storiesProgress.findIndex(p => p.storyId === storyProgress.storyId);
        if (index > 0) {
            sprintProgress.storiesProgress[index] = storyProgress;
        } else {
            sprintProgress.storiesProgress.push(storyProgress);
        }

        for (const progress of sprintProgress.storiesProgress) {
            if (progress.storyId === storyProgress.storyId) {
                return progress;
            }
        }

    }

}
