import { PageDefinition } from "../models/data/Page";
import { TemplateBuilder, TemplateData } from "../models/structure/TemplateBuilder";
import Component from "./Component";

interface StoredButton extends TemplateData {
	/** Legacy field kept for backward compatibility with stored data. */
	label?: string;
	/** Legacy field kept for backward compatibility with stored data. */
	text?: string;
}

export default class DMailBuilder extends Component {
	public Settings: { enabled: boolean; buttons: StoredButton[] } = {
		enabled: true,
		buttons: DMailBuilder.defaultTemplates,
	};

	private builder?: TemplateBuilder;

	public constructor() {
		super({
			constraint: PageDefinition.dmails.new,
			waitForDOM: "form.new_dmail .dtext_formatter",
		});
	}

	public static get defaultTemplates(): TemplateData[] {
		return [];
	}

	protected create(): Promise<void> {
		const target = document.querySelector<HTMLTextAreaElement>("form.new_dmail textarea[name='dmail[body]']");
		if (!target) return Promise.resolve();

		this.builder = new TemplateBuilder({
			targetField: target,
			label: "DMail templates",
			defaults: DMailBuilder.defaultTemplates,
			getTemplates: () => this.Settings.buttons.map((b) => ({
				title: b.title ?? b.label ?? "",
				body: b.body ?? b.text ?? "",
			})),
			setTemplates: (next) => { this.Settings.buttons = next; },
		});
		this.builder.mount();
		return Promise.resolve();
	}

	protected async destroy(): Promise<void> {
		this.builder?.destroy();
	}
}
