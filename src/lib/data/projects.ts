import OvaVid from '$lib/videos/omniverse-virtual-assistant.mp4';
import IniVid from '$lib/videos/i-note-it.mp4';
import TbpVid from '$lib/videos/three-body-problem.mp4';
import KVid from '$lib/videos/kunomenon.mp4';
import KcVid from '$lib/videos/kun-classifier.mp4';
import TrcvVid from '$lib/videos/TR-CV.mp4';

export let PROJECTS = {
	projects: [
		{
			title: 'Three Body Problem',
			href: 'https://github.com/zslrmhb/Three-Body-Problem',
			dates: 'Feb 2024 - March 2024',
			active: false,
			description: 'A visual explorable of the Three Body Problem inspired by Matrix Explorable',
			technologies: ['Javascript', 'Threlte', 'GSAP', 'Skeleton UI', 'Katex'],
			links: [
				{
					type: '',
					href: '',
					icon: ''
				}
			],
			image: '',
			video: TbpVid
		},
		{
			title: 'Kunomenon',
			href: 'https://github.com/zslrmhb/Kunomenon',
			dates: 'Feb 2024',
			active: false,
			description: 'The trend behind top 3000+ Cai Xukun videos on Bilibili',
			technologies: ['Javascript', 'Svelte', 'D3.js'],
			links: [
				{
					type: '',
					href: '',
					icon: ''
				}
			],
			image: '',
			video: KVid
		},
		{
			title: 'TR Computer Vision',
			href: 'https://github.com/zslrmhb/TRCV_2023',
			dates: 'April 2023',
			active: false,
			description: 'computer vision codebase for Triton Robotics @ UC San Diego',
			technologies: ['C++', 'OpenCV', 'ROS2', 'CUDA', 'Tensor-RT'],
			links: [
				{
					type: '',
					href: '',
					icon: ''
				}
			],
			image: '',
			video: TrcvVid
		},
		{
			title: 'Omniverse Virtual Assistant',
			href: 'https://github.com/zslrmhb/Omniverse-Virtual-Assisstant',
			dates: 'Dec 2022 - Jan 2023',
			active: false,
			description: 'Audio2Face Avatar with Riva SDK functionality',
			technologies: ['Python', 'Nvidia Riva', 'Audio2Face', 'Wikipedia API'],
			links: [
				{
					type: '',
					href: '',
					icon: ''
				}
			],
			image: '',
			video: OvaVid
		},
		{
			title: 'i-Note-it',
			href: 'https://github.com/zslrmhb/i-Note-It',
			dates: 'Jan 2023',
			active: false,
			description: 'Enhanced Note-Taking Experience with Artificial Intelligence',
			technologies: ['Python', 'Streamlit', 'AI21 Labs API'],
			links: [
				{
					type: '',
					href: '',
					icon: ''
				}
			],
			image: '',
			video: IniVid
		},

		{
			title: 'Kun Classfier',
			href: 'https://github.com/zslrmhb/Kun_Classifier',
			dates: 'Oct 2022 - Nov 2022',
			active: false,
			description: 'A meme-inspired binary classifier',
			technologies: ['Python', 'PyTorch', 'OpenCV', 'Streamlit'],
			links: [
				{
					type: '',
					href: '',
					icon: ''
				}
			],
			image: '',
			video: KcVid
		}
	]
};
