export class StoryProgress {

    date: Date;
    day = 0;
    total = 0;
    previous = 0;
    daily = 0;
    remaining = 0;
    storyId: string;

    public static progressAsPercentage(story: StoryProgress): number {

        if (story === undefined) {
            return 0;
        }

        const total = story.daily + story.previous + story.remaining;
        const progress = story.daily + story.previous;

        if (total === 0) {
            return 0;
        }

        return Math.round((progress / total) * 100);

    }
}
