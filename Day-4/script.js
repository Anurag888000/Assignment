// Get the editor and toolbar buttons
const editor = document.getElementById("editor");
const toolbarButtons = document.querySelectorAll(".toolbar-button");

// State for font size. The execCommand 'fontSize' uses values 1-7.
let currentFontSize = 3;

// Add click event listeners to each button
toolbarButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Prevent the button from taking focus away from the editor
    e.preventDefault();

    const command = button.dataset.command;

    if (command === "increaseFontSize") {
      if (currentFontSize < 7) currentFontSize++;
      document.execCommand("fontSize", false, currentFontSize);
    } else if (command === "decreaseFontSize") {
      if (currentFontSize > 1) currentFontSize--;
      document.execCommand("fontSize", false, currentFontSize);
    } else if (command === "hiliteColor") {
      // Check if the current selection is already highlighted
      const isHighlighted =
        document.queryCommandValue("backColor") === "rgb(255, 255, 0)"; // Check for yellow
      const color = isHighlighted ? "transparent" : "yellow";
      document.execCommand(command, false, color);
    } else {
      // For simple commands like bold, italic, underline
      document.execCommand(command, false, null);
    }

    // Re-focus the editor and update toolbar state
    editor.focus();
    updateToolbar();
  });
});

// Function to update the toolbar based on the current selection
const updateToolbar = () => {
  toolbarButtons.forEach((button) => {
    const command = button.dataset.command;

    // For simple toggle commands
    if (["bold", "italic", "underline"].includes(command)) {
      if (document.queryCommandState(command)) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    }

    // For highlight command
    if (command === "hiliteColor") {
      // queryCommandValue returns the color as rgb string
      if (document.queryCommandValue("backColor") === "rgb(255, 255, 0)") {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    }
  });
};

// Update the toolbar when the selection changes in the editor
editor.addEventListener("keyup", updateToolbar);
editor.addEventListener("mouseup", updateToolbar);
editor.addEventListener("focus", updateToolbar);

