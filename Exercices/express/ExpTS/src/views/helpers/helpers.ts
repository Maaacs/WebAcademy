import { Technology } from './helpersTypes';

export function nodejsTechnologies(technologies: Technology[]): string {
  return technologies
    .filter((tech) => tech.poweredByNodejs)
    .map((tech) => `<li>${tech.name} (${tech.type})</li>`)
    .join('');
}
