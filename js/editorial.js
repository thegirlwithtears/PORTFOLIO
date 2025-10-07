document.querySelectorAll('.editorial-item:not(.first)').forEach(item => {
  const img = item.querySelector('.image-wrapper');
  const txt = item.querySelector('.text-wrapper');

  gsap.fromTo(img,
    { x: -100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );

  gsap.fromTo(txt,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );
});

gsap.fromTo(firstImg,
  { scale: 1.3, opacity: 0, filter: "blur(15px) brightness(0.7)" },
  { 
    scale: 1,
    opacity: 1,
    filter: "blur(0px) brightness(1.2)", // un pequeño destello
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: firstItem,
      start: "top 80%",
      toggleActions: "play none none none" // solo se dispara una vez
    }
  }
);

gsap.fromTo(firstTxt,
  { opacity: 0, x: 50 },
  { 
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: firstItem,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  }
);

