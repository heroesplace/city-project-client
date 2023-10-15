import resources from "./engine/resources"

class GraphicEngine {
    constructor(socket, canvasList) {
        this.socket = socket
        this.canvasList = canvasList
        this.contextList = this.initializeCanvases(canvasList)
        this.textureCache = {}
    }

    initializeCanvases(canvasList) {
        const contextList = {};

        for (const canvas of canvasList) {
            const context = canvas.getContext('2d')
            contextList[canvas.id] = context
        }

        return contextList
    }

    loadTexturesList(textures_list) {
        return new Promise((resolve, reject) => {
            let result_list = [];
            let loadedCount = 0;
    
            for (const texture_name of textures_list) {
                const image = new Image();
    
                image.onload = () => {
                    result_list.push(image);
                    loadedCount++;
    
                    if (loadedCount === textures_list.length) {
                        // Toutes les textures sont chargées, résolve la promesse
                        resolve(result_list);
                    }
                }
    
                image.src = resources[texture_name];
                image.onerror = () => {
                    reject(new Error("Erreur lors du chargement de la texture " + texture_name));
                }
            }
        });
    }

    drawImage(canvasId, image, x, y) {
        const context = this.contextList[canvasId]
        if (context) {
            context.drawImage(image, x, y)
        }
    }
}

export default GraphicEngine
