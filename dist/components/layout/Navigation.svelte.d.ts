export default Navigation;
type Navigation = SvelteComponent<$$ComponentProps, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: "";
};
declare const Navigation: $$__sveltets_2_IsomorphicComponent<{
    isVisible?: boolean;
    setShowNavigation: unknown;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, "">;
type $$ComponentProps = {
    isVisible?: boolean;
    setShowNavigation: unknown;
};
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import("svelte").ComponentConstructorOptions<Props>): import("svelte").SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
