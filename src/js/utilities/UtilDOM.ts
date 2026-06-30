import Danbooru from "../models/api/Danbooru";
import Util from "./Util";

export class UtilDOM {

    /**
     * Adds the given style to the document and returns the injected style element
     * @param css string CSS styles
     */
    public static addStyle(css: string): JQuery<HTMLElement> {
        return $("<style>")
            .attr({
                "id": Util.ID.make(),
                "type": "text/css"
            })
            .html(css)
            .appendTo("head");
    }

    /** Sets up a container to load modals into */
    public static setupDialogContainer(): void {
        $("<div>")
            .attr("id", "remt-container")
            .prependTo("body");
    }

	protected static readonly SETTINGS_TARGET: string = ".nav-tools";
    /**
     * Adds a button to the top-right of the navbar
     * @param config Button configuration
     * @param {string} [target=UtilDOM.SETTINGS_TARGET] Target element
     * @param {boolean} [prepend=false] Prepend to `target`, or append?
     */
	public static addSettingsButton(config: SettingsButton, target: string, prepend?: boolean): JQuery<HTMLElement>;
    /**
     * Adds a button to the top-right of the navbar
     * @param config Button configuration
     * @param {boolean} [prepend=false] Prepend to `SETTINGS_TARGET`, or append?
     */
	public static addSettingsButton(config: SettingsButton, prepend?: boolean): JQuery<HTMLElement>;
    /**
     * Adds a button to the top-right of the navbar
     * @param config Button configuration
     * @param {string | boolean} [target=UtilDOM.SETTINGS_TARGET] Target element
     * @param prepend Prepend to `target`, or append?
     */
    public static addSettingsButton(config: SettingsButton, target: string | boolean = this.SETTINGS_TARGET, prepend = false): JQuery<HTMLElement> {
		if (typeof target !== "string") { prepend = target; target = UtilDOM.SETTINGS_TARGET; }
        if (config.name === undefined) config.name = "T";
        if (config.href === undefined) config.href = "";
        if (config.title === undefined) config.title = "";

        if (config.tabClass === undefined) config.tabClass = "";
        if (config.linkClass === undefined) config.linkClass = "";

        if (config.attr === undefined) config.attr = {};

        const $tab = $(`<li class="nav-remt-${config.id}">`)[prepend ? "prependTo" : "appendTo"](target);
        const $link = $("<a>")
            .html(config.icon ? `${config.icon}<span>${config.name}</span>` : config.name)
            .attr({
                "title": config.title,
                "id": config.id,
            })
            .appendTo($tab);

        if (config.onClick !== undefined)
            $link.on("click", () => { config.onClick?.($link); });

        if (config.href) { $link.attr("href", config.href); }
        if (config.tabClass) { $tab.addClass(config.tabClass); }
        if (config.linkClass) { $link.addClass(config.linkClass); }
        if (config.attr) { $link.attr(config.attr); }

        return $link;
    }

	/**
	 *
	 * @param param0
	 * @returns
	 * @copyright https://cssloaders.github.io/
	 */
	public static makeSpinnerJQuery({
		size = "48px",
		mainColor = "#FFF",
		secondaryColor = "#FF3D00",
		animationLength = "1s",
		spinnerWidth = "5px",
	}) {
		return $(`<span class="spinner"></span>`).css({
			"width": size,
			"height": size,
			"border": `${spinnerWidth} solid ${mainColor}`,
			"border-bottom-color": secondaryColor,
			"border-radius": "50%",
			"display": "inline-block",
			"box-sizing": "border-box",
			"animation": `rotation ${animationLength} linear infinite`,
		});
	}

	/**
	 *
	 * @param param0
	 * @returns
	 * @copyright https://cssloaders.github.io/
	 */
	public static makeSpinnerDOM({
		size = "48px",
		mainColor = "#FFF",
		secondaryColor = "#FF3D00",
		animationLength = "1s",
		spinnerWidth = "5px",
	}) {
		const s = document.createElement("span");
		s.className = "spinner";
		s.style.width = s.style.height = size;
		s.style.border = `${spinnerWidth} solid ${mainColor}`;
		s.style.borderBottomColor = secondaryColor;
		s.style.borderRadius = "50%";
		s.style.display = "inline-block";
		s.style.boxSizing = "border-box";
		s.style.animation = `rotation ${animationLength} linear infinite`;
		return s;
	}

	/**
	 * Build a DText input element with the same style, form, & function of the ones supplied by the server.
	 * @param textarea The main text entry element.
	 * @param options
	 * @returns Either the root element or an array w/ the root element & the help text.
	 * @todo Better utilize `innerHTML` to slim down.
	 * @todo Turn into a web component for consistent interop.
	 */
	public static buildDTextInput(textarea: HTMLTextAreaElement): HTMLDivElement | HTMLElement[] {
			return Danbooru.DTextFormatter?.buildFromTextarea(textarea);
	}

    static getPlaceholderImage(): string {
        return "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    }

    static getRat(): string {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IB2cksfwAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAJMASgAkLusKeAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+oEFREQKmXRgekAABSzSURBVHja7Vt5kJxHdf9193fOPbOzM7P3arXatY6VZcmXsC3L8YHtOCEQKAykCKQIDgUh5IAkOCRVuQMkhCRQFFSAhJADk8QOIbJBNkLGRtjRYSF5tZd2dnf2mGN37pnv6u78MbP2hhgj2yuhInTV1lfzfTPd7/36vfd7/d63wI/Hj8ePx//nQV7kGQXAAEgA3v93YNgPAOtHalAA6OrsugnARwHcd4EWs9kb8EMDXG1fP3r3TTfK9977+lUAtwLwXWIQLslQXuCebF+ntvWk1g7s2xMcn1s8TLl94JGnTjze/o37MnZ0PZ6QF1iPABDtP3bXXXcpgUCAAuAPPPAAB8AvNTCsfb3jrgM3yu8+8NnGe974OhfAm9r3zZcwj3rBq+7bt/7dB9rA/FH7s3GxLI+8iBu4APbBjP33393/S25fZ1w9NZWe+7WP/tUnAHyk/Vv5A/xXtK87AXwMQGWDJSAeiZJCqegB6ADwYQAPA/jS/b/xvrvjsag/s7S8+ud/86nPAvjAhrnlxXYB2lZ+9O2vufute4aHEDJ9Slcs4joD3QNvuO3W9504Nz3dp5BDR9Jp6wWUlxuEfB0A7fWvfc3N24YGb282m2CModmsYyY9h0cOfxN/+Zu/go6gH9OZlfo/fvv0wGtuvuYNvV1JMAInFDA6fvqu2999bnzu7GR68t/bAG4qCMr3MVsB4BfikfB7rx27wgn5/ZqAVMN+0/2pg9d3P3D4yX9L9A51ALA2CLR+DQPojge7xf4bd3/a4V7HYF83tg31u47jEsYoCoU8hOvgPfe+HldfsY10BP2cc37PfL12z0BPl+d5LssVC5pj23zXFVt9x46f/TyApwE8eykAWJ+8Oru4gon5JbpreBBMSoTCYaXX4wDsfKRTY8j8n7ncwa7+e9Or5U8FO/3unbcfpMGA310t5Oi58bMqoQymoeGx75zAWKoHb77zFpybnEYsGmGOy4U9fU4cOvyosn1kCIaugxBCLcdxpJQlAM5F4/zvExd84WAAXHDn/k9+1jt2dtKt1WqcUQpAsEMnT+Y3WMy62/zJnXf/xIc/9WcfxPvue6tSKubZxLmzaigcYtftvwEPPXwUlXoDd+2/FqlkJx587HFQhbUoQHCKeELZt2cnzs3Mot5o8oblkC986eHC8PDgdgDnvyeubGq0fyELON2bTNZyxdId//r1b1BPEhb2mVTTVLFjeJisZctbs+W1YwCqbzt4UD+VTnt/8e77fi0aCuxaLBVdpoDZzSaIBNaKFXx34jwe+fph7BnbgUQkDO5xTM9m0N0Rxda+bpRrdTx46CjuuPk6+EyDr5UqbGIqffjs+PibM5nM/GYHvxcDYP1+bXJufvKZiSnf1t7+J58+c+ZIIBz1FEa2mIZKWci3VzPM+uLS8vipdLoMALdde9VbApq2Lagy4WOMVSwbiqqgUCjgyWPfwTV7r8TI1iEoigLPspAIBjAy0IuG4+DsfAaezrClpwvhUFCkFxbpocNHDgP4HADtYuUC3w8A2X5WAfDVYqX8MIBHz05Npw+Pp28z/Xpg1/ZhmxBy23K2HK83qg8BwNefPrF7/57du68bHfF1GKasOBZpui6CwQD2jO1EdyqBrlQXHCEgPQf90QiSyQ588ZFv4F/++xTuvn4vNE0FCERudY0+e276LIAHNyRKlwyAjRma2vZxFcDMgdHhB0+Mp9+zfaRf6+tJ8WSiY++JZ868CsA/ADj82NMnGoZp3rVvx6id9PtZpVEjnmog0ZmEYfoAQmAaBqiqY3wxgw99+p8RCvtxYM9ORMJhSEgwxsRKtkDHJ6ZPAniovf4lBwAbgo5Y5/e5bL1bUvxyOGQS09Bkb3cXvfWWm1OPHnn8agBfAfCt7s7ks5OLi286t7BApK5JQiRpNBoIBMNglKJer2Alu4zp9AJiIRPbtvQjGg2BEAIJQFVVkSus0rPnpk5dDgB8zwjY3YnAs9MLy3tHtvTF4rEIV1VVv+rKPds9l4cyS0snJubmnjoxPjE5UW3sZ54X0lRFmKZOJOfwPBdLK8uYmU2jabkYGepHRzQKhTFIKUEIQb3eEIvLOTo1k77sACBA0y5Xyqeb9dpbd+/a3mVoirAsiwz09dqaYd4QDAbt87PpMzeMXrWQz6z83NmpiZjp88tYJESyuRxK5RJyhTWsFisIB31IdsbheS6kEKCMwbJszGcWxfm5JbqSy190AJSX+H35vDD68tRMWiiMkq5kgsymzxtX7hr1KMMHDz925P5ltwoz5kdEi+DczAI9+u2z0AMG7Eoed956AEP9vXAcF8vZPLjnIR6PIcAYlrN5FCs1uEIiEkmQUin3QyuJ/SDgvHA4/pnBgdQ7do5uaV4xPGR63EMgEIY/EIbrWshk5kEA1GoNLOdyMHQDXAikOjvQEYtASIn0/CJSiTj8Ph+EELAdC5RSmcutkcnZRfv06anDW0cGXnv8+HH3MokBzydLtt34jt106lzK24UUXijgJ7quEtexIbiHzngSkUgMsWgUqWQShq4iHAwgHArB8ziy+QJKlSoooQiHg2BMQSrVC5/PT5KJBA8Eguo3Hj+qLC8vf2xD5iovBwCeS5Ys2zpTWLW0RrPxqmSigyiMCO55xPVc6JoBIQRAAIUxCM6haxpsx0alWgckQbPZRLlSRTQcgq7rUBQVPp8P/kCQaJpGOhPJ+uzC2qxjVWfbxVlyuQAg265QF8J+xLJwTaVW6g0GAlo4FJCCC9Js1NFsNmA16mg2my2fowTlShWcc3QlO9G0LGQLq/D7fTANDfVaFabPB8u2iGnqsr+3J5xZSN+rE/VIsVqevZwAWM8RCADd9awvFAq1MSHlrqZlOa7rKuFICJqqghAKSmiL5yXgMwz4/T54nEOhDHWriWfOTCIc8KOjI4ZarYq1Qh6uy4lp+mRnzO9Um9YvzM4t5NvHYmWzWIFtEpC8JRT/MiTzN237AGXEUxilxXIZUkoE/H5wKUBAWnwPQEiBM+emUFgtIpWII9kZg6HpUBSGheUsMovLCPpN0ts3ICdn0mz6/Ox/ADjePht4lxMAz7lFvVGbaDR5hRJ5UAhBKCUgIOBCwNQNoJ3sAATc45iYTmOtWMGOkSFEwyFQQqEwBbVaHSv5NRRLZXREw6Q7lSJ9Pb2+Z86czQCY2ixX2EwAZPu8UHRda7xQtN4fDvvh03UphCCQEuFwCJDkOdGFECiVy7AdB/FYFN2pJDjnaNoWICUq1RoOHT2BkcEkGejr8XRDGy4Wi9enYvGvxZOFaj7/yk+IdJMtoC2QFvf5dKEyhpXcKqnWG1CUVqoLAkhIQEpQStHTlYRh6qCUtBmDIJdfRblah6KoCJgq8vkizs/NKkS47h233Dj6zLnJE7Q65t+MPsVmA9BSHzr3PEFPnp1Bw/Uk0Ap+G5WXbUbo6koiHovC47ztGgBhFJS2AFsrZJFdW8PkdBrlalVhjAEQ1sUsib1SVoCDajrmV65zrdpcXzJOwkG/4NwDCGmnMW1FQaAqDJASIKQFDiQkF3BdF36fjnvuuAUTMxl4nkCxVMF8ZgmAKcooX5YArGtnrayuPgXImq5piEVCMhIOg4jnDXZ9twWXCPh80FQFUkhAEkTCIagKA2MMgYAfi5kcCAEczxO1egMAoqIkNiUIKhcBAAlA2b5lS48jYRIC6LpOotEIPNcDoS0aXMeqRZG+diWoxRjRSBiu5yFXWIUQADN8kFJIyT3mOm4TEA/7Nb/7Ig0ZeaEp82ZbwPp8Q9lSbfz6a8a2BIIBeJxTIXgrBpCNoraCohAClLbSfAkJIQSklGCUQUCAuy50XZfZfBGHHj36FcB+3URhor6+6MGDB5W2whuLN+SHFgQBqFJKkxBChMellBJMaRublM+JJ6TAwuISarV6iwEAgBIIKRCLRpBMdMCxHIDBe+rUOTqXyf4ugDfua/UQRduC5ZEjRzwAhwF8yzTDEwr1/+WGuuYlBWAd9aLtCtlsWkgmYjAMHUtLKy2ZuISUrUAnAdTrFqLRMELBAKQEKGlNwyiF3+dDf28XDly7C67LMTUzUwSA48ePryvnAYjpauTjv//eX/qJW/dff0OzWT7Tk4r//YX2EJRNVp4DgUQ4rN3T29WJjmgYmqoSj/N24KOQVD6HEpVAJBxERzQM3dDheRykHSk5l1BVFfGOGLo6S1hZySP7/IbRdqeo6+4DN75zsL/vvYZhOj5DPwLgQ3NLc8+u1ywuJQDtHbHeHgxG/rQ71el1dSWUXK4AQghSyQSE4G3yI+1IJZCIxwBKwLkAJYAktPWUAZxzCCEQDQbQGY9hcnrJAJoYHByk6XQaAD402N/zriu3Dzfvu/8PTAA/D2ClfVZwLlTozQRAAGKHYfp/KhoJcNd2WHd3EqqmYnFpGR3xaMv8ZZvvAUzPLSDgM6FrGoSQz9MIY2g0m8hkltHX300Cfh98pnbr3MLiaKlU+lJ7zVtN07e/0WiQuaUC8Qnz803ezP8wWGC9N/irw1u3/NbYFVvQk+xkhFJkllbguR56ulKYnk5DSAlFUQBKQBWGvu4UNFWDeD4AQFVVFApF1OoN9A/0QFEUoiqMs1Zjsn+j2w0P9OHKHaMoVi2sOWvey6WtzaK/uwxdH2KMurbjUEiJoN8HzgXq9QaikQhKxTIs2wJjDBASPsMAo/S53IBQikJhDZQSqIqCRsPC6moJju0QVVUAwN64cNOyUKnVX/aZYLMAWDe3CmUUluWQ/GoJkBJ+nwlFUVCp1RAJh+B5Hmr1BhzHea7fJds5Afc4bMtGo9EApQS6rmFpOYtcYRW1RgO8RZUbFWXFchW5wqoEIfLlgHBR8gCFMSiMgakq0gvL8DwX/f29GJ+cQSqVAAAsLmZBGduQD7VOg+m5DHp6UnA5x0ImC9MwYGgqVssVzC9lAegbqa3Sm0pg5+gIAELG+keclxrc6SZSIAD4GaFgjLlcCMwtLoMQoFqtYX4uA13XMDOThq5pSKU6MTk1Ay5ap8C1YhnZXAGjo0NYXMyiXKpC11V4nofZxWU4tisNTQPg+AGgnQz9zonTE/d++b8eVX/5zfe4FWkdBXBTmwGMS8kC6y7wuKZqCQns9ftMT3BBHdeFFICiKCBoHXZq9QZc7iLR2QFD08EohaYq4FJgcSkLzjkYobAdG6vFEmzb42ulilIsVj5dqVZ+HUBxeXkZAORyIXc+v1A8qfnVO3/m1psTI4ODY8fPPlsEcPpCyuibTYOlcqUy67gyYRj6dl1TSNNyIKSAojBYdstCp2cXYNkOulNJrORWsbpWhoAEJQRPnTwLQ1MhpES1Xke5UoeuaXxppcAWMgufB/BIu/LE22s6Hzz4qqnPPf7E7x287mqFMtINsN3VivfEzt3bC8vLy+JSlsR0AJlmE0fzhfJvxOMhaJoqJZekUq2jVrdQrFblwkpeOrYLzgV55PCTyGcLcF2OumXBsh1hOTap1BtwXA8KpdJ2PVKpNPLlSvMhgH/3e3uF54sibJj69XOlXNdgKkmu2DKY+NoTj7/x1aOjHzuVTr9oL0HZJN9fB6BNUQ3mecDTx5/BtVdfhYDZckemMEyfz5BstkJy+Sqspi1f++obyS3XXo3Flbz8wEc+TnoSPXRoWzc0yiRAiMs5nvzOcQpgD4Dl9loblSLz5fkKgNuypdyDb7n9ttd0xKIAUMXgxQ+C6xmX1BDYOdzXtxXAh265/tqvfuAdb3Xf9abXw7Ndcvr8PGzBxfRsBtQlHw+o5B0RRf8H2/GIrmpiKj0nT4xPEADZ4e7eDy7OFcqleoMsrRXl1PlFcv873+7dvv/6rwH47Z29vcMBBHZsXBvYt66HdX5+EQuLrfiA9EUuiMSAkAX4G4A0wVKNtTqlCKBUrbHc6poaj4TlrqF+XDHYA0kIPXZsHJ0+/1S5UX4y6esaFEIiVypLlTFyxeAA3v+Lbzc/8pnPXQNAvWfkJsTCQdTrlsytrinVeoNRRHzZUqlXKp4S9aI1aTTJ/t7elUPTx20Ab3v/L77tSgng9NQ0ACWWvogsQABA6OiTnF0ZgC+qQbEtVzAlUH16fjE/derc5LVb+vv8pqkzQ9OIFNKeXcxPmJI+UXXrtaAWSEpFbrMlDyciETo80CO7OzuMUDC8PZMtqn3JuOyMRomiMP63//qN+Ux24Q8lrKMNx1Fd4bkerJ6G53VNr60pN+zeO3T1nrGvXLVjW7xar+Hfj52o+iX7IlHIoXw+z18sBpBXAID0Ad0UxrCBQMNBnTXgMkDxKQqwfaBfPT2T/wJHMdICms4FFf9bXM9lDFA54PojRqxa5p8f27s1NNrXLXdtGaQ7t23jn/nyQ+w/HzsiAYOYqr9x447R+3KlSl1wz9QM6gpBhGN7JBjSSiv5+k92D8be9643/6z9zePHyZcf/ZbSXKl9ykbt3e0N5hfj/YAXqsUJP7QxD6SXg1hQPCURiXQKSTQGQApp54qlnAnT8kHlLkBs1EOJVDLYsJ2P9gx0DowND9kDybi+fWgYT546g7/+whfX44wFMA7w/yXvq2+60X3V3jGlM95hfO3YMTc9v2IuZgrvyRdXPjE8PKxPT0/bLyWKv+IxCBg1QC0gKYAsFGAvAMNrnRSJAl0JwHQVQHqA9GApVGGaEGTEjAfe1tsVv2p0sM+9YWwXzRdL1HJcMtCdBACcm0kjHAqiO9kJ1/VwcnwCV44MS6qo5MkTp3Fyagazs9l3uW75nwCUcYHvFG9qVTjdennaArIAgAh803VIVX1eEGnDJgwQNpoATMo8riai1rfP52qnHdt7k5B4J+ESwYAP/d0pEQ4GieRcGoYOXVMQ8vvhOA6hhJBSrU4atnfqX7566J8ivph/wO383DTK9oWY/kWxgO+TG1zweAPewB7Af3wTsNWh0ZH+3UP9qZ5YFJRSTGaWEPAZ6I7F4Hhc/tvXnziZLyybAP4GwCe/h9rFyxEWFxmMC81JOAAkO5K/3XD5H0uIKgFRWx01KSWBykDye/eNjRw5cqS2XoVug81fKuiX4z9AtXcwFgKaYTz/EgYASBMgTRABNLIbdlriR2yQH7mFXgG9vmgj9sfjFY7/AeFQsBlo7iolAAAAAElFTkSuQmCC";
    }

    /** Throws an error if the element isn't found. */
    public static querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K, parentElement?: Element | Document): HTMLElementTagNameMap[K];
    /** Throws an error if the element isn't found. */
    public static querySelector<K extends keyof SVGElementTagNameMap>(selectors: K, parentElement?: Element | Document): SVGElementTagNameMap[K];
    /** Throws an error if the element isn't found. */
    // public static querySelector<K extends keyof MathMLElementTagNameMap>(selectors: K, parentElement?: Element | Document): MathMLElementTagNameMap[K];
    /** Throws an error if the element isn't found. */
    public static querySelector<K extends Element>(selectors: string, parentElement?: Element | Document): K;
    /** Throws an error if the element isn't found. */
    public static querySelector<K extends string>(selectors: K, parentElement: Element | Document = document): Element {
      const e = parentElement.querySelector(selectors);
      if (!e) throw new Error(`Expected DOM element not found (\`${selectors}}\`).`);
      return e;
    }
}

export interface SettingsButton {

    /** Unique button ID */
    id: string;

    /** Text inside the link */
    name?: string;
    icon?: string;
    /** Link address */
    href?: string;
    /** Hover text */
    title?: string;

    /** Extra class to append to the tab */
    tabClass?: string;
    /** Extra class to append to the link */
    linkClass?: string;

    /** Name-value pairs of the attribute to set */
    attr?: { [prop: string]: string };

    onClick?: ($element: JQuery<HTMLElement>) => void;
}
