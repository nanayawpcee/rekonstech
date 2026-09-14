declare module 'hbs' {
  interface SafeStringConstructor {
    new (str: string): { toString(): string };
  }

  interface Handlebars {
    SafeString: SafeStringConstructor;
    registerHelper(name: string, fn: (...args: any[]) => any): void;
    escapeExpression(str: string): string;
  }

  const hbs: {
    handlebars: Handlebars;
    registerHelper(name: string, fn: (...args: any[]) => any): void;
    registerPartials(
      directory: string,
      options?: { rename?: (name: string) => string },
      done?: (error?: Error) => void,
    ): void;
    localsAsTemplateData(app: unknown): void;
  };

  export = hbs;
}
