/*==================================================
  SITE DATA — edit this file to update content.
==================================================*/

window.SITE = {
    /* Instagram username without "@". While it is empty the Instagram links stay hidden. */
    instagramUser: 'mica.dev',
};

/*==================================================
  PROJECTS
  - Order in this array = order on the page.
  - featured: true  → large card in "Selected Work" (best with 4–6).
    featured: false → compact row in "More projects".
  - image: file name prefix inside assets/img/projects/ (e.g. 'preview-16'
    uses preview-16-640.webp and preview-16-960.webp). Use null for no image.
  - stack / description: optional, leave [] or '' to hide.
==================================================*/
window.PROJECTS = [
    {
        title: 'Club Macabras',
        category: 'Full-Stack',
        description: '',
        stack: ['Node.js', 'Express.js', 'React 18', 'Vite', 'Tailwind CSS', 'PostgreSQL'],
        image: 'preview-16',
        url: 'https://clubmacabras.netlify.app/',
        linkLabel: 'View Project',
        featured: true,
    },
    {
        title: 'Sistema de Encuestas Anónimas',
        category: 'Full-Stack',
        description: '',
        stack: ['NestJS', 'Angular', 'PostgreSQL'],
        image: 'preview-15',
        url: 'https://github.com/MicaelaKloster/Sistema-de-Encuestas',
        linkLabel: 'View Project',
        featured: true,
    },
    {
        title: 'Historia Clinica',
        category: 'Backend',
        description: 'Python medical records management system',
        stack: ['Python'],
        image: 'preview-14',
        url: 'https://github.com/MicaelaKloster/Historia-Clinica---Instituto-Medico-Las-Luciernagas',
        linkLabel: 'View Project',
        featured: true,
    },
    {
        title: 'Car Dealership',
        category: 'Backend',
        description: 'Backend system for car dealership management',
        stack: [],
        image: 'preview-12',
        url: 'https://github.com/MicaelaKloster/TFI-PROG3',
        linkLabel: 'View Project',
        featured: true,
    },
    {
        title: 'Lista de Tareas',
        category: 'React',
        description: 'React + TypeScript task management app',
        stack: ['React', 'TypeScript'],
        image: 'preview-13',
        url: 'https://lista-tareas-pendientes-react-ts.netlify.app/',
        linkLabel: 'View Project',
        featured: false,
    },
    {
        title: 'Vans Product Card',
        category: 'Web Development',
        description: 'Interactive product card with modern design',
        stack: [],
        image: 'preview-8',
        url: 'https://vans-product-card.netlify.app/',
        linkLabel: 'View Project',
        featured: false,
    },
    {
        title: 'JG Jewelry',
        category: 'Brand Design',
        description: 'Concept brand for Instagram social media',
        stack: [],
        image: 'preview-7',
        url: 'https://www.instagram.com/j_g__joyeria/',
        linkLabel: 'View Instagram',
        featured: false,
    },
    {
        title: 'Calendar Space - Webflow 101',
        category: 'Webflow',
        description: 'Calendar application built with Webflow',
        stack: [],
        image: 'preview-6',
        url: 'https://calendar-webflow-101.webflow.io',
        linkLabel: 'View Demo',
        featured: false,
    },
    {
        title: 'Chevrolet Camaro Website',
        category: 'Web Design',
        description: 'Complete website design in Figma',
        stack: [],
        image: 'preview-5',
        url: 'https://www.figma.com/file/5tNbM1POC7gV89Ygstyr2V/Camaro-V8---Website?node-id=0%3A1&t=EOwaIP8E0kD27eFe-1',
        linkLabel: 'View in Figma',
        featured: false,
    },
    {
        title: 'Modern Gym Website',
        category: 'Web Development',
        description: 'Responsive gym website with modern design',
        stack: [],
        image: 'preview-1',
        url: 'https://modern-gym.netlify.app/',
        linkLabel: 'View Demo',
        featured: false,
    },
    {
        title: 'Responsive Website Practice',
        category: 'Web Development',
        description: 'Modern responsive website with clean design',
        stack: [],
        image: null, // previously reused the Modern Gym preview; add its own capture here
        url: 'https://micaelakloster.github.io/Responsive-Design-Website-Practice-1/',
        linkLabel: 'View Demo',
        featured: false,
    },
    {
        title: 'Watches E-Commerce Store',
        category: 'E-Commerce',
        description: 'Full-featured e-commerce platform',
        stack: [],
        image: 'preview-2',
        url: 'https://watches-ecommerce-store.netlify.app/',
        linkLabel: 'View Demo',
        featured: false,
    },
    {
        title: 'NFT Website',
        category: 'Web3',
        description: 'Modern NFT showcase platform',
        stack: [],
        image: 'preview-3',
        url: 'https://nfts-website.netlify.app/',
        linkLabel: 'View Demo',
        featured: false,
    },
    {
        title: 'Application Design',
        category: 'UI/UX Design',
        description: 'Mobile application interface design',
        stack: [],
        image: 'preview-4',
        url: 'https://www.canva.com/design/DAFRW-R-Zuo/3L-_MgHdKd141JJFHdolpw/watch?utm_content=DAFRW-R-Zuo&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
        linkLabel: 'View Demo',
        featured: false,
    },
];
