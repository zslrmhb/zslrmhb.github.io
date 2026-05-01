import { House, NotebookPen, Camera } from 'lucide-svelte';

import GithubSvg from '$lib/imgs/github.svg';
import GithubDarkSvg from '$lib/imgs/github-dark.svg';
import PersonalImg from '$lib/imgs/personal-portrait.png';
import LinkedinSvg from '$lib/imgs/linkedin.svg';
import LinkedinDarkSvg from '$lib/imgs/linkedin-dark.svg';

export let PERSONAL_INFO = {
	name: 'Hongbin Miao',
	navbar: [
		{ href: '/', icon: House, label: 'Home' },
		{ href: '/blog', icon: NotebookPen, label: 'Blog' },
		{ href: '/photography', icon: Camera, label: 'Photography' }
	],
	contact: {
		social: {
			GitHub: {
				name: 'GitHub',
				url: 'https://github.com/zslrmhb',
				icon: GithubSvg,
				navbar: true,
				dark_icon: GithubDarkSvg
			},
			LinkedIn: {
				name: 'LinkedIn',
				url: 'https://www.linkedin.com/in/hongbinmiao/',
				icon: LinkedinSvg,
				navbar: true,
				dark_icon: LinkedinDarkSvg
			}
		}
	},
	personal_portrait: PersonalImg
};
