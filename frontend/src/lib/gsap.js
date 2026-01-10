import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initGSAP() {
  if (typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
}

export default gsap;