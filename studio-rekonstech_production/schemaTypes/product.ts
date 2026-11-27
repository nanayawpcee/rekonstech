import {defineField, defineType} from 'sanity'

/** Keep in step with CATALOGUE_CATEGORIES in src/content/catalogue.content.ts. */
const CATEGORIES = ['Laptops', 'Desktops', 'Servers & Networking', 'Peripherals', 'Software']

const CONDITIONS = [
  {title: 'New', value: 'new'},
  {title: 'Refurbished', value: 'refurbished'},
  {title: 'Used', value: 'used'},
]

/**
 * A product in the Sales & Supply catalogue. There is deliberately no price:
 * stock can be second-hand, so pricing is agreed with the customer on quotation.
 */
export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
      type: 'string',
      description: 'As customers would search for it, e.g. "HP EliteBook 840 G8".',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: CATEGORIES, layout: 'dropdown'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {list: CONDITIONS, layout: 'radio', direction: 'horizontal'},
      initialValue: 'new',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'conditionNote',
      title: 'Condition notes',
      type: 'string',
      description:
        'For refurbished or used items, e.g. "Grade A, light marks on lid, new battery".',
      hidden: ({parent}) => parent?.condition === 'new',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'spec',
      title: 'Key specs',
      type: 'string',
      description: 'One short line, e.g. "Core i5 · 16GB · 512GB SSD".',
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      description: 'e.g. "From stock" or "3 to 5 days". Leave empty to show "Price on request".',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'Landscape works best. Photograph the actual item for used stock.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Image description',
          type: 'string',
          description: 'What the photo shows, for screen readers and search engines.',
        }),
      ],
    }),
    defineField({
      name: 'sku',
      title: 'Stock code',
      type: 'string',
      description:
        'Optional. Included in quote requests so you know exactly which unit was asked for.',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description:
        'Lower numbers show first. Leave empty to list newest first after numbered items.',
    }),
    defineField({
      name: 'hidden',
      title: 'Hide from the website',
      type: 'boolean',
      description: 'Turn on when an item is sold or out of stock, without deleting it.',
      initialValue: false,
    }),
  ],
  orderings: [
    {title: 'Sort order', name: 'sortOrder', by: [{field: 'sortOrder', direction: 'asc'}]},
    {title: 'Name', name: 'name', by: [{field: 'name', direction: 'asc'}]},
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      condition: 'condition',
      hidden: 'hidden',
      media: 'image',
    },
    prepare({title, category, condition, hidden, media}) {
      const label = CONDITIONS.find((option) => option.value === condition)?.title ?? 'New'
      return {
        title: title || 'Untitled product',
        subtitle: [label, category, hidden ? 'Hidden' : null].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
