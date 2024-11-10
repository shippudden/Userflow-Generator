/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, { width: 500, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-flow') {
    const { requirements } = msg;
    
    // Create a new page for the user flow
    const page = figma.createPage();
    page.name = "User Flow";
    
    // Load fonts
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    
    const frames: FrameNode[] = [];
    let xPosition = 0;
    
    // Create frames for each requirement
    for (const req of requirements) {
      // Create main frame
      const frame = figma.createFrame();
      frame.name = req.title;
      frame.x = xPosition;
      frame.y = 0;
      frame.resize(300, 200);
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      frame.cornerRadius = 8;
      frame.effects = [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 2 },
          radius: 4,
          visible: true,
          blendMode: "NORMAL"
        }
      ];
      
      // Add title
      const title = figma.createText();
      title.characters = req.title;
      title.x = 20;
      title.y = 20;
      title.fontSize = 16;
      title.fontName = { family: "Inter", style: "Bold" };
      frame.appendChild(title);
      
      // Add description
      const description = figma.createText();
      description.characters = req.description;
      description.x = 20;
      description.y = 50;
      description.fontSize = 14;
      description.fontName = { family: "Inter", style: "Regular" };
      description.resize(260, description.height);
      frame.appendChild(description);
      
      page.appendChild(frame);
      frames.push(frame);
      xPosition += 400;
    }
    
    // Create connector arrows between frames
    for (let i = 0; i < frames.length - 1; i++) {
      const currentFrame = frames[i];
      const nextFrame = frames[i + 1];

      const distance = nextFrame.x - (currentFrame.x + currentFrame.width)
      
      // Create arrow
      const arrow = figma.createLine();
      arrow.x = currentFrame.x + currentFrame.width;
      arrow.y = currentFrame.y + (currentFrame.height / 2);
      arrow.resize(distance, 0);
      arrow.strokes = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 } }];
      arrow.strokeWeight = 2;
      
      // Add arrowhead
      const arrowhead = figma.createPolygon();
      arrowhead.x = arrow.x + arrow.width - 5;
      arrowhead.y = arrow.y - 5;
      arrowhead.resize(10, 10);
      arrowhead.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 } }];
      arrowhead.rotation = -90;
      
      page.appendChild(arrow);
      page.appendChild(arrowhead);
    }
    
    // Focus view on the flow
    figma.currentPage = page;
    figma.viewport.scrollAndZoomIntoView(frames);
  }
};