export class Progress {

    date: Date;
    day: number = 1;
    total: number = 0;
    previous: number = 0;
    daily: number = 0;
    remaining: number = 0;

}

export class StoryProgress extends Progress {
    storyId: string;
}


export class SprintProgress extends Progress {
    sprintId: string;
    storiesProgress: StoryProgress[];


    public static reset(progress: SprintProgress) {
        console.log("reset(progress: SprintProgress)");

        progress.previous = 0;
        progress.daily = 0;
        progress.total = 0;
        progress.remaining = 0;

    }

    public static setProgress(sprintProgress: SprintProgress, storyProgress: StoryProgress) {
        console.log("setProgress(sprintProgress: SprintProgress, storyProgress: StoryProgress)");

        if (storyProgress.storyId == undefined) {
            console.log("Missing storyId on storyProgress" + storyProgress);
            return;
        }

        if (sprintProgress.storiesProgress == undefined) {
            sprintProgress.storiesProgress = new Array<StoryProgress>();
        }


        let index: number = sprintProgress.storiesProgress.findIndex(p => p.storyId == storyProgress.storyId);
        if (index > 0) {
            sprintProgress.storiesProgress[index] = storyProgress;
        } else {
            sprintProgress.storiesProgress.push(storyProgress);
        }

        for (let progress of sprintProgress.storiesProgress) {
            if (progress.storyId == storyProgress.storyId) {
                return progress;
            }
        }

    }

}
