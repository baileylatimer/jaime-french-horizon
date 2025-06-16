document.addEventListener('DOMContentLoaded', function() {
  // Wait for GSAP to be available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not found. Hero text animation disabled.');
    return;
  }

  // Function to animate hero h1 text
  function animateHeroText() {
    // Select all h1 elements within hero sections
    const heroHeadings = document.querySelectorAll('.hero h1');
    
    heroHeadings.forEach(heading => {
      // Skip if already animated
      if (heading.hasAttribute('data-animated')) return;
      heading.setAttribute('data-animated', 'true');
      
      // Get the text content
      const text = heading.textContent.trim();
      if (!text) return;
      
      // Hide initially
      heading.style.opacity = '0';
      
      // Clear and rebuild with spans
      heading.textContent = '';
      
      // Split by words for more elegant animation
      const allLetters = [];
      const words = text.split(' ');
      
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        
        // Add space after word (except last)
        if (wordIndex < words.length - 1) {
          wordSpan.style.marginRight = '0.3em';
        }
        
        // Create spans for each letter in the word
        word.split('').forEach(char => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          span.style.display = 'inline-block';
          span.style.transform = 'translateY(20px)';
          span.style.willChange = 'transform, opacity';
          
          wordSpan.appendChild(span);
          allLetters.push(span);
        });
        
        heading.appendChild(wordSpan);
      });
      
      // Show the heading container
      heading.style.opacity = '1';
      
      // Premium animation with subtle transform and longer duration
      gsap.timeline({ delay: 0.3 }) // Initial delay for page load
        .to(allLetters, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: {
            each: 0.05,
            ease: "power2.out"
          },
          ease: "power3.out",
          onComplete: function() {
            // Clean up willChange for performance
            allLetters.forEach(letter => {
              letter.style.willChange = 'auto';
            });
          }
        });
    });
  }
  
  // Run animation on initial load with slight delay
  setTimeout(animateHeroText, 100);
  
  // Re-run animation when hero sections are dynamically loaded
  document.addEventListener('shopify:section:load', function(event) {
    // Check if the loaded section contains a hero
    if (event.target && event.target.querySelector && event.target.querySelector('.hero')) {
      setTimeout(animateHeroText, 200); // Slightly longer delay for dynamic content
    }
  });
});
