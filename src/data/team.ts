import type { ImageMetadata } from 'astro';

export interface TeamMember{
    photo: ImageMetadata | null;
    name: string;
    university: string;
    position: string;
}

export const team: TeamMember[] = [
    {
        photo: null,
        name: 'Iyzman Daniel',
        university: 'University Malaysia Sabah',
        position: 'Software Engineer and Meeran Stack Developer',
    },
    {
        photo: null,
        name: 'Danial Ikhwan',
        university: 'Taylors University',
        position: 'Cybersecurity Engineer and Full Time Trader',
    },
    {
        photo: null,
        name: 'Zaeem Zharfan',
        university: 'University Malaysia Sabah',
        position: 'Software Engineer and KLP48 Developer',
    },

];