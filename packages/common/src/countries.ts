import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { Country } from "@/country";

countries.registerLocale(en);

export class Countries {
    public static readonly list = Object.entries(countries.getNames("en")).map(
        ([code, name]) => ({
            code,
            name
        })
    );

    public static getDefault(): Country {
        const code = navigator.language.split("-").at(-1);
        if (!code) return this.getByCode("US")!;
        return this.getByCode(code) ?? this.getByCode("US")!;
    }

    public static hasCode(code: string): boolean {
        code = code.toUpperCase();
        return this.list.some(country => country.code === code);
    }

    public static hasName(name: string): boolean {
        return this.list.some(country => country.name === name);
    }

    public static getByCode(code: string): Country | undefined {
        code = code.toUpperCase();
        return this.list.find(country => country.code === code)
    }
    
    public static getByName(name: string): Country | undefined {
        return this.list.find(country => country.name === name)
    }
}