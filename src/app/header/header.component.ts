import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  services = [
    {
      title: 'Web Development',
      description: 'We offer full-stack web development services with modern technologies.',
      image: 'assets/images/web-development.jpg',  // Update with the actual path
      link: '/services/web-development'
    },
    {
      title: 'Mobile App Development',
      description: 'Build powerful and efficient mobile apps for both iOS and Android platforms.',
      image: 'assets/images/mobile-app.jpg',  // Update with the actual path
      link: '/header/mobile-app'
    },
    {
      title: 'SEO Optimization',
      description: 'Improve your website visibility with our SEO optimization services.',
      image: 'assets/images/seo.jpg',  // Update with the actual path
      link: '/header/seo-optimization'
    },
    {
      title: 'Digital Marketing',
      description: 'Boost your brand with our tailored digital marketing strategies.',
      image: 'assets/images/digital-marketing.jpg',  // Update with the actual path
      link: '/header/digital-marketing'
    }
    
    // Add more services here
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
