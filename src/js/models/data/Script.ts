/**
 * Basic script parameters, both hard-coded and derived from the userscript header.
 * GM_info is used here because of XM.Connect initialization issues.
 */
export default class Script {
    public static version = GM_info.script.version;
    public static handler = {
        name: GM_info.scriptHandler,
        version: GM_info.version,
    }
    public static url = {
        website: "https://re621.app",
        repo: "https://github.com/DRLaDRLa/re6ai.ModTools",
        issues: "https://github.com/DRLaDRLa/re6ai.ModTools/issues",
        thread: "https://e6ai.net/forum_topics/227",
        latest: "https://api.github.com/repos/DRLaDRLa/re6ai.ModTools/releases/latest",
        kofi: "https://ko-fi.com/bitWolfy",
    }
    public static userAgent = "re6ai.ModTools/" + this.trimVersion(Script.version);

    private static trimVersion(value: string): string {
        const match = value.match(/(\d\.\d+)\.\d+/);
        if (!match || !match[1]) return "0.0";
        return match[1];
    }
}
