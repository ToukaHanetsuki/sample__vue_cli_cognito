interface SampleItem {
  id: number;
  text: string;
}

export class ExampleCodeUtils {

  public static createSampleList(): SampleItem[] {
    return [...Array(60).keys()].map(i => {
      return {
        id: ++i,
        text: Math.random().toString(36).slice(-8)
      };
    });
  }

  public static examplePromise(agr?: unknown): Promise<unknown> {
    return new Promise<unknown>((resolve) => {
      setTimeout(() => {
        resolve(agr);
      }, 1000);
    });

  }
}