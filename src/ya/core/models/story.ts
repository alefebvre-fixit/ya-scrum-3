import { StoryProgress } from './story-progress';

export class Story {

    $key: string;
    name: string;
    status: string;
    type: string;
    theme: string;

    description: string;
    acceptanceCriterias: string;
    comment: string;
    duration: number;

    priority: number;

    estimate: number;

    sprintId: string;

    productOwnerId: string;
    history: StoryProgress[];

    //Index for query
    //http://stackoverflow.com/questions/26700924/query-based-on-multiple-where-clauses-in-firebase
    filter_status: string;

    public static getUpdate(story: any): any {

        const result = Object.assign({}, story);
        delete (result.$key);
        delete (result.$exists);

        return result;
    }


    public static create(): Story {
        const result: Story = new Story();

        result.priority = 1;
        result.status = 'new';
        result.type = 'feature';
        result.estimate = 1;
        result.theme = 'pink';

        return result;
    }

    public static toMap(history: StoryProgress[]): Map<number, StoryProgress> {
        const result: Map<number, StoryProgress> = new Map<number, StoryProgress>();

        if (history) {
            for (const progress of history) {
                result.set(progress.day, progress);
            }
        }

        return result;
    }

    public static getProgress(story: Story, day: number): StoryProgress {
        if (story.history) {
            for (const progress of story.history) {
                if (progress && progress.day === day) {
                    return progress;
                }
            }
        }
        return undefined;
    }

    public static getLatestProgress(story: Story): StoryProgress {
        if (story && story.history) {
            return Story.getProgress(story, story.history.length);
        }
        return new StoryProgress();
    }

    public static cancelLatestProgress(story: Story) {
        if (story && story.history && story.history.length > 0) {
            story.history.splice(-1, 1);
        }
        if (story.history === undefined) {
            story.history = [];
        }
    }


    public static createProgress(story: Story, day: number): StoryProgress {

        const result = new StoryProgress();

        result.storyId = story.$key;
        result.day = day;
        result.date = new Date();

        const previous = Story.getProgress(story, day - 1);
        if (previous) {
            result.previous = previous.previous + previous.daily;
            result.total = previous.previous + previous.daily;
            result.daily = 0;
            result.remaining = story.estimate - (previous.previous + previous.daily);
        } else {
            result.previous = 0;
            result.daily = 0;
            result.total = 0;
            result.remaining = story.estimate;
        }

        return result;

    }

    /*
    public static cancelProgress(story: Story, day: number): StoryProgress {


        const progress = Story.getProgress(story, day);
        if (progress) {
            progress.previous = progress.previous + progress.daily;
            progress.total = previous.previous + previous.daily;
            progress.daily = 0;
            progress.remaining = story.estimate - (previous.previous + previous.daily);
        } 


    }
    */


    public static setProgress(story: Story, progress: StoryProgress) {

        if (story.history === undefined) {
            story.history = new Array<StoryProgress>();
        }

        //if (progress.day > 0 && progress.day <= story.history.length) {
        if (progress.day > 0) {
            story.history[progress.day - 1] = progress;
        }

    }

    public static getFilterStatus(status: string): string {
        if ('started' === status || 'assigned' === status) {
            return 'progress';
        }
        if ('new' === status || undefined === status) {
            return 'pending';
        }
        return status;
    }

    public static progressAsPercentage(story: Story): number {
        const latest = Story.getLatestProgress(story);
        if (latest && story.estimate > 0) {
            return (latest.total / story.estimate) * 100;
        } else {
            return 0;
        }
    }

}
