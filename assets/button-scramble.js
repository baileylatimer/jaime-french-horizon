document.addEventListener('DOMContentLoaded', function() {
  // Wait for GSAP to be available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not found. Button scramble effect disabled.');
    return;
  }

  // Function to create scrambled text
  function getScrambledText(text, chars) {
    let scrambled = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        scrambled += ' ';
      } else {
        scrambled += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    return scrambled;
  }

  // Select only buttons within hero sections
  const buttons = document.querySelectorAll('.hero .button');
  
  buttons.forEach(button => {
    // Store original text
    const originalText = button.textContent.trim();
    if (!originalText) return;
    
    // Get unique characters from the button text (excluding spaces)
    const uniqueChars = [...new Set(originalText.replace(/\s/g, '').split(''))].join('');
    
    // Create timeline for each button
    let tl;
    
    button.addEventListener('mouseenter', function() {
      // Cancel any existing animation
      if (tl) tl.kill();
      
      // Set initial scrambled text
      button.textContent = getScrambledText(originalText, uniqueChars);
      
      // Create new timeline
      tl = gsap.timeline();
      
      // Animate to original text
      tl.to(button, {
        duration: 0.4,
        text: {
          value: originalText,
          delimiter: "",
          speed: 1,
          scramble: false // Don't scramble during animation, we already set scrambled text
        },
        ease: "none"
      });
    });
    
    button.addEventListener('mouseleave', function() {
      // Cancel any existing animation
      if (tl) tl.kill();
      
      // Reset to original text immediately
      button.textContent = originalText;
    });
  });
});

// Re-initialize when new buttons are added dynamically
document.addEventListener('shopify:section:load', function() {
  // Function to create scrambled text
  function getScrambledText(text, chars) {
    let scrambled = '';
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        scrambled += ' ';
      } else {
        scrambled += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    return scrambled;
  }

  // Re-run the initialization for dynamically loaded content
  const newButtons = document.querySelectorAll('.hero .button');
  
  newButtons.forEach(button => {
    // Skip if already initialized
    if (button.hasAttribute('data-scramble-initialized')) return;
    
    button.setAttribute('data-scramble-initialized', 'true');
    
    const originalText = button.textContent.trim();
    if (!originalText) return;
    
    // Get unique characters from the button text (excluding spaces)
    const uniqueChars = [...new Set(originalText.replace(/\s/g, '').split(''))].join('');
    let tl;
    
    button.addEventListener('mouseenter', function() {
      if (tl) tl.kill();
      
      // Set initial scrambled text
      button.textContent = getScrambledText(originalText, uniqueChars);
      
      tl = gsap.timeline();
      tl.to(button, {
        duration: 0.4,
        text: {
          value: originalText,
          delimiter: "",
          speed: 1,
          scramble: false
        },
        ease: "none"
      });
    });
    
    button.addEventListener('mouseleave', function() {
      if (tl) tl.kill();
      button.textContent = originalText;
    });
  });
});
