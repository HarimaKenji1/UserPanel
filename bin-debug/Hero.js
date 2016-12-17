var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Cache = function (target, propertyKey, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        //console.log(target,propertyKey)
        var cacheKey = "__cache" + propertyKey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this);
        }
        return target[cacheKey];
    };
};
var Quality;
(function (Quality) {
    Quality[Quality["WHITE"] = 1] = "WHITE";
    Quality[Quality["GREEN"] = 1.1] = "GREEN";
    Quality[Quality["BLUE"] = 1.2] = "BLUE";
    Quality[Quality["PURPLE"] = 1.4] = "PURPLE";
    Quality[Quality["ORAGE"] = 1.8] = "ORAGE";
})(Quality || (Quality = {}));
var WeaponType;
(function (WeaponType) {
    WeaponType[WeaponType["HANDSWORD"] = 1] = "HANDSWORD";
    WeaponType[WeaponType["GREATSWORD"] = 1.8] = "GREATSWORD";
    WeaponType[WeaponType["AXE"] = 2] = "AXE";
    WeaponType[WeaponType["KATANA"] = 1.5] = "KATANA";
    WeaponType[WeaponType["HAMMER"] = 2.5] = "HAMMER";
})(WeaponType || (WeaponType = {}));
var ArmorType;
(function (ArmorType) {
    ArmorType[ArmorType["LIGHTARMOR"] = 1] = "LIGHTARMOR";
    ArmorType[ArmorType["LEATHERARMOR"] = 1.4] = "LEATHERARMOR";
    ArmorType[ArmorType["PLATEARMOR"] = 2] = "PLATEARMOR";
    ArmorType[ArmorType["HEAVYARMOR"] = 2.4] = "HEAVYARMOR";
    ArmorType[ArmorType["NOTHINGTOWEAR"] = 0.2] = "NOTHINGTOWEAR";
})(ArmorType || (ArmorType = {}));
var JewelPromotion;
(function (JewelPromotion) {
    JewelPromotion[JewelPromotion["ATTACKPRMOTE"] = 1] = "ATTACKPRMOTE";
    JewelPromotion[JewelPromotion["DEFENCEPRMOTE"] = 2] = "DEFENCEPRMOTE";
    JewelPromotion[JewelPromotion["AGILEPRMOTE"] = 3] = "AGILEPRMOTE";
})(JewelPromotion || (JewelPromotion = {}));
var User = (function () {
    function User(name, level) {
        this.currentExp = 0;
        this.totalExp = 0;
        this.level = 1;
        this.diamonds = 0;
        this.gold = 0;
        this.__heros = [];
        this.__herosInTeam = [];
        this.userName = "";
        this.userName = name;
        this.level = level;
    }
    var d = __define,c=User,p=c.prototype;
    p.getTotalExp = function () {
        this.totalExp = (this.level + 60) * this.level;
        return this.totalExp;
    };
    p.addHeros = function (hero) {
        this.__heros.push(hero);
    };
    p.addHeroInTeam = function (hero) {
        this.__herosInTeam.push(hero);
    };
    p.getFightPower = function () {
        var result = 0;
        this.__herosInTeam.forEach(function (hero) { return result += hero.getFightPower(); });
        return result;
    };
    p.changeHeroTeam = function (heroToUp, heroToDown) {
    };
    __decorate([
        Cache
    ], p, "getTotalExp", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return User;
}());
egret.registerClass(User,'User');
var Hero = (function () {
    function Hero(name, quality, level, heroBitmap) {
        this.isInTeam = false;
        this.name = "";
        this.quality = 0;
        this.maxHP = 0;
        this.currentHP = 0;
        this.attack = 0;
        this.defence = 0;
        this.agile = 0;
        this.level = 1;
        this.currentExp = 0;
        this.totalExp = 0;
        this.property = [];
        //__equipmentsOnEquip : Equipment[] = [];
        this.__weaponsOnEquip = [];
        this.__armorOnEquip = [];
        this.name = name;
        this.quality = quality;
        this.level = level;
        this.heroBitemap = new egret.Bitmap();
        this.heroBitemap.texture = RES.getRes(heroBitmap);
        if (this.quality == Quality.WHITE)
            this.color = 0xffffff;
        if (this.quality == Quality.BLUE)
            this.color = 0x0000dd;
        if (this.quality == Quality.GREEN)
            this.color = 0x00dd00;
        if (this.quality == Quality.PURPLE)
            this.color == 0x6c1f7c;
        if (this.quality == Quality.ORAGE)
            this.color = 0xf4a315;
    }
    var d = __define,c=Hero,p=c.prototype;
    p.getTotalExp = function () {
        this.totalExp = (this.level + 50) * this.level;
        return this.totalExp;
    };
    p.addWeapon = function (weapon) {
        this.__weaponsOnEquip.push(weapon);
    };
    p.addArmor = function (armor) {
        this.__armorOnEquip.push(armor);
    };
    p.getMaxHP = function () {
        var result = 0;
        this.__weaponsOnEquip.forEach(function (weapon) { return result += weapon.getFightPower() * 0.2; });
        this.__armorOnEquip.forEach(function (armor) { return result += armor.getFightPower() * 0.8; });
        result += this.level * 10 * this.quality;
        this.property[0] = new Property("最大生命值", result, false);
        return result;
    };
    p.getAttack = function () {
        var result = 0;
        this.__weaponsOnEquip.forEach(function (weapon) { return result += weapon.getAttack() * 0.5; });
        result += this.level * 5 * this.quality;
        this.property[1] = new Property("攻击力", result, false);
        return result;
    };
    p.getDefence = function () {
        var result = 0;
        this.__armorOnEquip.forEach(function (armor) { return result += armor.getDefence() * 0.2; });
        result += this.level * 2 * this.quality;
        this.property[2] = new Property("防御力", result, false);
        return result;
    };
    p.getAglie = function () {
        var result = 0;
        this.__weaponsOnEquip.forEach(function (weapon) { return result += weapon.getAglie() * 0.4; });
        this.__armorOnEquip.forEach(function (armor) { return result += armor.getAglie() * 0.4; });
        result += this.level * 4 * this.quality;
        this.property[3] = new Property("敏捷", result, false);
        return result;
    };
    p.getFightPower = function () {
        var result = 0;
        this.__weaponsOnEquip.forEach(function (weapon) { return result += weapon.getFightPower(); });
        this.__armorOnEquip.forEach(function (armor) { return result += armor.getFightPower(); });
        result += (10 + this.getAttack() * 10 + this.getDefence() * 8 + this.getAglie() * 6) * this.level * this.quality;
        return result;
    };
    __decorate([
        Cache
    ], p, "getTotalExp", null);
    __decorate([
        Cache
    ], p, "getMaxHP", null);
    __decorate([
        Cache
    ], p, "getAttack", null);
    __decorate([
        Cache
    ], p, "getDefence", null);
    __decorate([
        Cache
    ], p, "getAglie", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment() {
        this.quality = 0;
        //level = 1;
        this.currentExp = 0;
        //totalExp = 0;
        //agile = 0;
        this.isWeapon = false;
        this.name = "";
        this.__jewelOnEquip = [];
    }
    var d = __define,c=Equipment,p=c.prototype;
    //  @Cache
    //  getTotalExp(){
    //      this.totalExp = (this.level + 20) * this.level;
    //      return this.totalExp;
    //  }
    p.getFightPower = function () {
        return 0;
    };
    p.addJewl = function (jewel) {
        this.__jewelOnEquip.push(jewel);
    };
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(name, quality, weaponType, weaponIconId) {
        _super.call(this);
        //attack = 0;
        this.isWeapon = true;
        this.weaponType = 0;
        this.property = [];
        this.name = name;
        this.quality = quality;
        //this.level = level;
        this.weaponType = weaponType;
        this.equipmentBitmap = new egret.Bitmap();
        this.equipmentBitmap.texture = RES.getRes(weaponIconId);
        if (this.quality == Quality.WHITE)
            this.color = 0xffffff;
        if (this.quality == Quality.BLUE)
            this.color = 0x0000dd;
        if (this.quality == Quality.GREEN)
            this.color = 0x00dd00;
        if (this.quality == Quality.PURPLE)
            this.color == 0x6c1f7c;
        if (this.quality == Quality.ORAGE)
            this.color = 0xf4a315;
    }
    var d = __define,c=Weapon,p=c.prototype;
    p.getAttack = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4; });
        result += 10 * this.weaponType * this.quality;
        this.property[0] = new Property("攻击力", result, false);
        return result;
    };
    p.getAglie = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4; });
        result += 5 * this.quality / this.weaponType;
        this.property[1] = new Property("敏捷", result, false);
        return result;
    };
    p.getFightPower = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower(); });
        result += this.getAttack() * this.quality * 10 + this.getAglie() * this.quality * 5;
        return result;
    };
    __decorate([
        Cache
    ], p, "getAttack", null);
    __decorate([
        Cache
    ], p, "getAglie", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Weapon;
}(Equipment));
egret.registerClass(Weapon,'Weapon');
var Armor = (function (_super) {
    __extends(Armor, _super);
    function Armor(name, quality, armorType, armorIconId) {
        _super.call(this);
        //defence = 0;
        this.armorType = 0;
        this.isWeapon = false;
        this.property = [];
        this.name = name;
        this.quality = quality;
        this.armorType = armorType;
        this.equipmentBitmap = new egret.Bitmap();
        this.equipmentBitmap.texture = RES.getRes(armorIconId);
        if (this.quality == Quality.WHITE)
            this.color = 0xffffff;
        if (this.quality == Quality.BLUE)
            this.color = 0x0000dd;
        if (this.quality == Quality.GREEN)
            this.color = 0x00dd00;
        if (this.quality == Quality.PURPLE)
            this.color == 0x6c1f7c;
        if (this.quality == Quality.ORAGE)
            this.color = 0xf4a315;
    }
    var d = __define,c=Armor,p=c.prototype;
    p.getDefence = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4; });
        result += 6 * this.armorType * this.quality;
        this.property[0] = new Property("防御力", result, false);
        return result;
    };
    p.getAglie = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4; });
        result += 5 * this.quality / this.armorType;
        this.property[1] = new Property("敏捷", result, false);
        return result;
    };
    p.getFightPower = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower(); });
        result += this.getDefence() * this.quality * 10 + this.getAglie() * this.quality * 5;
        return result;
    };
    __decorate([
        Cache
    ], p, "getDefence", null);
    __decorate([
        Cache
    ], p, "getAglie", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Armor;
}(Equipment));
egret.registerClass(Armor,'Armor');
var Jewel = (function () {
    //promotionType = 0;
    function Jewel(quality) {
        this.quality = 0;
        this.quality = quality;
        if (this.quality == Quality.WHITE)
            this.color = 0xffffff;
        if (this.quality == Quality.BLUE)
            this.color = 0x0000dd;
        if (this.quality == Quality.GREEN)
            this.color = 0x00dd00;
        if (this.quality == Quality.PURPLE)
            this.color == 0x6c1f7c;
        if (this.quality == Quality.ORAGE)
            this.color = 0xf4a315;
    }
    var d = __define,c=Jewel,p=c.prototype;
    p.getFightPower = function () {
        var result = 0;
        result = this.quality * 10;
        return result;
    };
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
var Property = (function () {
    function Property(name, value, isRate) {
        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }
    var d = __define,c=Property,p=c.prototype;
    p.getDescription = function () {
        if (this.isRate) {
            return this.name + ": +" + (this.value / 10).toFixed(2) + "%";
        }
        else {
            return this.name + ": +" + this.value;
        }
    };
    return Property;
}());
egret.registerClass(Property,'Property');
var Properties = (function () {
    function Properties() {
        this.all = [
            "攻击力",
            "防御力",
            "敏捷",
            "品质"
        ];
    }
    var d = __define,c=Properties,p=c.prototype;
    return Properties;
}());
egret.registerClass(Properties,'Properties');
var Package = (function () {
    function Package() {
    }
    var d = __define,c=Package,p=c.prototype;
    return Package;
}());
egret.registerClass(Package,'Package');
//# sourceMappingURL=Hero.js.map