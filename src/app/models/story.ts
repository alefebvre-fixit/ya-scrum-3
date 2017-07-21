import { StoryProgress } from './progress';

export class Story {

    $key: string;
    name: string;
    status: string;
    type: string;

    description: string;
    acceptanceCriterias: string;
    comment: string;
    duration: number;

    priority: number;
    estimate: number;
    size: number;

    sprintId: string;
    productOwnerId: string;

    progress: number;

    history: StoryProgress[];

    //Index for query
    //http://stackoverflow.com/questions/26700924/query-based-on-multiple-where-clauses-in-firebase
    filter_status: string;

    public static getUpdate(story: any): any {

        const result = Object.assign({}, story);
        delete (result.$key);
        delete (result.$exists);
        console.log("Object to save:");
        console.log(result);

        return result;
    }


    public static create(): Story {
        let result: Story = new Story();

        result.priority = 1;
        result.status = 'new';
        result.type = 'feature';
        result.size = 1;
        result.progress = 0;

        return result;
    }

    public static toMap(history: StoryProgress[]): Map<number, StoryProgress> {
        const result: Map<number, StoryProgress> = new Map<number, StoryProgress>();

        if (history) {
            for (let progress of history) {
                result.set(progress.day, progress);
            }
        }

        return result;
    }

    public static getProgress(story: Story, day: number): StoryProgress {
        console.log(story.history);
        if (story.history) {
            for (let progress of story.history) {
                if (progress.day === day) {
                    return progress;
                }
            }
        }
        return undefined;
    }

    public static createProgress(story: Story, day: number): StoryProgress {

        const result = new StoryProgress();

        result.storyId = story.$key;
        result.day = day;
        result.date = new Date();
        result.previous = 0;
        result.daily = 0;
        result.total = 0;
        result.remaining = story.size;

        return result;

    }

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
        if ("started" === status || "assigned" === status) {
            return "progress";
        }
        if ("new" === status || undefined === status) {
            return "pending";
        }
        return status;
    }

    public static progressAsPercentage(story: Story): number {
        if (story && story.size > 0) {
            return (story.progress / story.size) * 100;
        } else {
            return 0;
        }
    }

}
