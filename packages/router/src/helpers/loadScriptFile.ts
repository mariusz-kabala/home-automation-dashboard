export function loadScriptFile(scriptName: string, url: string): Promise<void> {
    return new Promise((resolve) => {
      const id = `script-${scriptName}`;
  
      if (document.getElementById(id)) {
        console.warn(`script "${id}" exists`);
        return;
      }
  
      const js = document.createElement("script");
      const onLoad = () => {
        resolve();
        js.removeEventListener("load", onLoad);
      };
  
      js.id = id;
      js.src = url;
  
      document.body.appendChild(js);
  
      js.addEventListener("load", onLoad);
    });
  }
