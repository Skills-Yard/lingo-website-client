/**
 * Processes an image URL, removes its white background (or close to white background)
 * using a BFS flood fill starting from the corners, and returns a Promise with the transparent data URL.
 */
export function removeImageBackground(src: string): Promise<string> {
  if (typeof window === "undefined") {
    return Promise.resolve(src);
  }
  return new Promise((resolve) => {
    const img = new Image();
    // Allow same-origin canvas loading
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(src);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = imgData.width;
        const height = imgData.height;

        const visited = new Uint8Array(width * height);
        const queue: number[] = [];
        let head = 0;

        const pushPixel = (x: number, y: number) => {
          const idx = y * width + x;
          if (visited[idx] === 0) {
            visited[idx] = 1;
            queue.push(idx);
          }
        };

        // Push four corners to start flood fill
        pushPixel(0, 0);
        pushPixel(width - 1, 0);
        pushPixel(0, height - 1);
        pushPixel(width - 1, height - 1);

        // Near white backgrounds: R, G, B all high (e.g., > 240)
        const isBgColor = (r: number, g: number, b: number) => {
          return r > 240 && g > 240 && b > 240;
        };

        while (head < queue.length) {
          const idx = queue[head++];
          const x = idx % width;
          const y = Math.floor(idx / width);

          const rIdx = idx * 4;
          const r = data[rIdx];
          const g = data[rIdx + 1];
          const b = data[rIdx + 2];
          const a = data[rIdx + 3];

          if (a > 0 && isBgColor(r, g, b)) {
            data[rIdx + 3] = 0; // Set Alpha to transparent

            // Check 4-way neighbors
            if (x > 0) pushPixel(x - 1, y);
            if (x < width - 1) pushPixel(x + 1, y);
            if (y > 0) pushPixel(x, y - 1);
            if (y < height - 1) pushPixel(x, y + 1);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (error) {
        console.error("Failed to make image background transparent:", error);
        resolve(src);
      }
    };
    img.onerror = () => {
      resolve(src);
    };
    img.src = src;
  });
}
