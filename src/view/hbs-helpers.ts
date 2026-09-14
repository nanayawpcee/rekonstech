import hbs from 'hbs';
import { renderIcon } from '../content/icons';

export function registerHbsHelpers(): void {
  const { handlebars } = hbs;

 
  handlebars.registerHelper('icon', (name: string, className?: unknown) => {
    const classes = typeof className === 'string' ? className : 'h-6 w-6';
    return new handlebars.SafeString(renderIcon(name, classes));
  });

  /** {{year}} — keeps the footer copyright current without a redeploy. */
  handlebars.registerHelper('year', () => new Date().getFullYear());

  /** {{inc @index}} — 1-based counters for numbered lists. */
  handlebars.registerHelper('inc', (value: number) => Number(value) + 1);

  /** {{#each (array "a" "b")}} — inline literal lists in a template. */
  handlebars.registerHelper('array', (...args: unknown[]) => args.slice(0, -1));

  /** {{#each (range 18)}} — repeat a block N times; `this` is the index. */
  handlebars.registerHelper('range', (count: number) =>
    Array.from({ length: Math.max(0, Number(count) || 0) }, (_, index) => index),
  );

  /** {{#ifEquals a b}}…{{else}}…{{/ifEquals}} — used for the logo's light/dark variants. */
  handlebars.registerHelper(
    'ifEquals',
    function (this: unknown, a: unknown, b: unknown, options: any) {
      return a === b ? options.fn(this) : options.inverse(this);
    },
  );
}
