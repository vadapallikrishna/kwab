declare global {
	module JSX {
		type Element = string;
		interface IntrinsicElements {
			[elemName: string]: any
		}
	}

}

class Kwab{
    private static instance: Kwab;
    private el?: HTMLElement;
    private routes: any;
    constructor() {
	this.routes = [];
    }

    static getInstance(): Kwab {
	if(!Kwab.instance)
		Kwab.instance = new Kwab();
	return Kwab.instance;
    }

    appendRoute(path: string, component: string) {
      	this.routes.push({"path": path,"component": component});
    }
    
    getView(path: string) {
       let { component } = this.routes.find((i:any) => i["path"] == path);
       if(this.el)
       	 this.el.appendChild(document.createElement(component));    
    }

    mountPoint(el: HTMLElement | null) {
	if(el instanceof HTMLElement) {
	  this.el = el;
	  this.getView("/");
	}
    }

}



window.addEventListener("popstate", function(event: any) {
      	let instance = Kwab.getInstance();
    	instance.getView(window.location.pathname);
});

function createElement(component: any,props: any,children: any) {
         let el = document.createElement(component);
	 el = (<any>Object).assign(el,props);
	 el.append(...children);
	 return el;
}

function define(name: string, html: any) {
     let element = class extends HTMLElement {
	constructor() {
           super();
	   let shadowRoot = this.attachShadow({mode: "open"});
	   let template = html();
	   shadowRoot.appendChild(template.cloneNode(true));
	}
     }
     customElements.define(name,element);
}

function mount(el: HTMLElement | null) {
     alert("Hello");
     let instance = Kwab.getInstance();
     instance.mountPoint(el);
}

function route(pathname: string, component: string) {
	let instance = Kwab.getInstance();
	instance.appendRoute(pathname, component);
}

export {
	Kwab, 
	define, 
	createElement, 
	mount, 
	route
};
