import { ADJECTIVES, ANIMALS } from '@/constants'

export function generateRandomName(): string {
  const randomAdjective =
    ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]

  return `${randomAdjective} ${randomAnimal}`
}
