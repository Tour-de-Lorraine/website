export default LottiePlayer;
type LottiePlayer = SvelteComponent<$$ComponentProps, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: "";
} & {
    isPlaying: false;
};
declare const LottiePlayer: $$__sveltets_2_IsomorphicComponent<{
    setPlayer: unknown;
} & Record<string, unknown>, {
    [evt: string]: CustomEvent<any>;
}, {}, {
    isPlaying: false;
}, "">;
type $$ComponentProps = {
    setPlayer: unknown;
} & Record<string, unknown>;
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
