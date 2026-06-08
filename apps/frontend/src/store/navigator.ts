import { Routes } from "@three-chess/common";
import type { Navigation } from "../navigation.js";

export class Navigator {
    private readonly navigation: Navigation;

    public constructor(navigation: Navigation) {
        this.navigation = navigation;
    }

    public goHome(): void {
        this.navigation.navigate(Routes.HOME);
    }

    public goMatch(): void {
        this.navigation.navigate(Routes.MATCH);
    }

    public goLogin(): void {
        this.navigation.navigate(Routes.LOGIN);
    }

    public goRegister(): void {
        this.navigation.navigate(Routes.REGISTER);
    }

    public isHome(): boolean {
        return this.navigation.current() == Routes.HOME;
    }

    public isMatch(): boolean {
        return this.navigation.current() == Routes.MATCH;
    }

    public isLogin(): boolean {
        return this.navigation.current() == Routes.LOGIN;
    }

    public isRegister(): boolean {
        return this.navigation.current() == Routes.REGISTER;
    }
}