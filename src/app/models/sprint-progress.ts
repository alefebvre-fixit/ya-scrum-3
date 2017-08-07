import { StoryProgress } from './story-progress';

export class SprintProgress {


    date: Date;
    day = 1;

    total = 0;
    previous = 0;
    daily = 0;
    remaining = 0;

    sprintId: string;


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
        sprintProgress.previous += storyProgress.previous;
        sprintProgress.daily += storyProgress.daily;
        sprintProgress.remaining += storyProgress.remaining;
        sprintProgress.total += storyProgress.total;

    }

}
