export function displayDialogue(text, onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  const closeBtn = document.getElementById("close");
  
  // Check if text is an array (multi-page) or string (single page)
  const pages = Array.isArray(text) ? text : [text];
  let currentPage = 0;
  
  dialogueUI.style.display = "block";
  
  // Create next button if it doesn't exist
  let nextBtn = document.getElementById("next-btn");
  if (!nextBtn) {
    nextBtn = document.createElement("button");
    nextBtn.id = "next-btn";
    nextBtn.textContent = "Next →";
    nextBtn.style.cssText = `
      background-color: ##98623c;
      border: 2px solid #4A3018;
      color: #9c7836ff;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin-top: 10px;
      margin-left: 10px;
      cursor: pointer;
      border-radius: 5px;
      font-weight: bold;
    `;
    closeBtn.parentElement.appendChild(nextBtn);
  }
  
  function showPage() {
    let index = 0;
    let currentText = "";
    const pageText = pages[currentPage];
    
    dialogue.innerHTML = "";
    
    const intervalRef = setInterval(() => {
      if (index < pageText.length) {
        currentText += pageText[index];
        dialogue.innerHTML = currentText;
        index++;
        return;
      }
      clearInterval(intervalRef);
    }, 1);
    
    // Update button visibility
    if (currentPage < pages.length - 1) {
      // More pages available
      nextBtn.style.display = "inline-block";
      closeBtn.style.display = "none";
    } else {
      // Last page
      nextBtn.style.display = "none";
      closeBtn.style.display = "inline-block";
    }
  }
  
  // Button handlers
  nextBtn.onclick = () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
      showPage();
    }
  };
  
  closeBtn.onclick = () => {
    dialogueUI.style.display = "none";
    dialogue.innerHTML = "";
    onDisplayEnd();
  };
  
  // Keyboard handler
  const handleKeypress = (e) => {
    if (e.code === "Enter") {
      if (currentPage < pages.length - 1) {
        currentPage++;
        showPage();
      } else {
        dialogueUI.style.display = "none";
        dialogue.innerHTML = "";
        onDisplayEnd();
        removeEventListener("keypress", handleKeypress);
      }
    }
  };
  addEventListener("keypress", handleKeypress);
  
  // Start with first page
  showPage();
}

export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
}