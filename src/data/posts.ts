export type Post = {
  id: number
  title: string
  description?: string
  badge?: 'NEW' | 'UPDATED'
  tag: string
  image?: string
}

export const posts: Post[] = [
  {
    id: 1,
    title: 'Not Available on Mobile Hint',
    description: 'Go Amazon and buy a new screen',
    badge: 'NEW',
    tag: 'Easter Egg',
  },
  {
    id: 2,
    title: 'Reduce Edge Blur While Scrolling',
    badge: 'NEW',
    tag: 'Motion',
  },
  {
    id: 3,
    title: 'Use Live Text Formatter to Highlight',
    badge: 'UPDATED',
    tag: 'Easter Egg',
  },
  {
    id: 4,
    title: 'Scroll-Linked Parallax Effect',
    badge: 'NEW',
    tag: 'Motion',
  },
  {
    id: 5,
    title: 'Context Menu on Right Click',
    description: 'Hidden actions on secondary click',
    tag: 'Easter Egg',
  },
  {
    id: 6,
    title: 'Smooth Height Transition',
    badge: 'NEW',
    tag: 'Motion',
  },
]
