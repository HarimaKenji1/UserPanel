var UserPanel = (function (_super) {
    __extends(UserPanel, _super);
    function UserPanel() {
        var _this = this;
        _super.call(this);
        this.width = 480;
        this.height = 600;
        this.background = this.createBitmapByName("UserPanelBackGround_png");
        this.addChild(this.background);
        this.background.x = 0;
        this.background.y = 0;
        this.background.width = 480;
        this.background.height = 600;
        this.background.touchEnabled = true;
        this.background.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.equipmentInformationPanel.alpha = 0;
        }, this);
        this.weaponIconBitmap = new egret.Bitmap();
        this.weaponIconBitmap.width = 50;
        this.weaponIconBitmap.height = 50;
        this.addChild(this.weaponIconBitmap);
        this.weaponIconBitmap.x = this.width * 7 / 9;
        this.weaponIconBitmap.y = this.height / 8;
        this.weaponIconBitmap.touchEnabled = true;
        this.weaponIconBitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.hero.__weaponsOnEquip[0].getEquipmentInformations();
            _this.equipmentInformationPanel.showEquipmentInformation(_this.hero.__weaponsOnEquip[0]);
            _this.equipmentInformationPanel.alpha = 1;
        }, this);
        this.helmentIconBitmap = new egret.Bitmap();
        this.helmentIconBitmap.width = 50;
        this.helmentIconBitmap.height = 50;
        this.addChild(this.helmentIconBitmap);
        this.helmentIconBitmap.x = this.width * 7 / 9;
        this.helmentIconBitmap.y = this.weaponIconBitmap.y + this.height / 6;
        this.helmentIconBitmap.touchEnabled = true;
        this.helmentIconBitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.hero.__armorOnEquip[0].getDefence();
            _this.hero.__armorOnEquip[0].getAglie();
            _this.equipmentInformationPanel.showEquipmentInformation(_this.hero.__armorOnEquip[0]);
            _this.equipmentInformationPanel.alpha = 1;
        }, this);
        this.corselerIconBitmap = new egret.Bitmap();
        this.corselerIconBitmap.width = 50;
        this.corselerIconBitmap.height = 50;
        this.addChild(this.corselerIconBitmap);
        this.corselerIconBitmap.x = this.width * 7 / 9;
        this.corselerIconBitmap.y = this.helmentIconBitmap.y + this.height / 7;
        this.corselerIconBitmap.touchEnabled = true;
        this.corselerIconBitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.hero.__armorOnEquip[1].getDefence();
            _this.hero.__armorOnEquip[1].getAglie();
            _this.equipmentInformationPanel.showEquipmentInformation(_this.hero.__armorOnEquip[1]);
            _this.equipmentInformationPanel.alpha = 1;
        }, this);
        this.shoesIconBitmap = new egret.Bitmap();
        this.shoesIconBitmap.width = 50;
        this.shoesIconBitmap.height = 50;
        this.addChild(this.shoesIconBitmap);
        this.shoesIconBitmap.x = this.width * 7 / 9;
        this.shoesIconBitmap.y = this.corselerIconBitmap.y + this.height / 6;
        this.shoesIconBitmap.touchEnabled = true;
        this.shoesIconBitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.hero.__armorOnEquip[2].getDefence();
            _this.hero.__armorOnEquip[2].getAglie();
            _this.equipmentInformationPanel.showEquipmentInformation(_this.hero.__armorOnEquip[2]);
            _this.equipmentInformationPanel.alpha = 1;
        }, this);
        this.heroPicture = new egret.Bitmap();
        this.heroPicture.width = 323;
        this.heroPicture.height = 400;
        this.addChild(this.heroPicture);
        this.heroPicture.x = 0;
        this.heroPicture.y = 50;
        this.heroInformationText = "";
        this.heroInformationTextField = new egret.TextField();
        this.heroInformationTextField.width = 400;
        this.heroInformationTextField.height = 100;
        this.addChild(this.heroInformationTextField);
        this.heroInformationTextField.x = (this.width - this.heroInformationTextField.width) / 2;
        this.heroInformationTextField.y = 460;
        this.heroInformationTextField.size = 16;
        this.equipmentInformationPanel = new EquipmentInformationPanel();
        this.addChild(this.equipmentInformationPanel);
        this.equipmentInformationPanel.x = (this.width - this.equipmentInformationPanel.width) / 2;
        this.equipmentInformationPanel.y = (this.height - this.equipmentInformationPanel.height) / 2;
        this.equipmentInformationPanel.alpha = 0;
    }
    var d = __define,c=UserPanel,p=c.prototype;
    p.showHeroInformation = function (hero) {
        this.hero = hero;
        this.getHeroInformations(hero);
        this.heroPicture.texture = RES.getRes(hero.heroBitemapID);
        this.weaponIconBitmap.texture = RES.getRes(hero.__weaponsOnEquip[0].equipmentBitmapID);
        this.helmentIconBitmap.texture = RES.getRes(hero.__armorOnEquip[0].equipmentBitmapID);
        this.corselerIconBitmap.texture = RES.getRes(hero.__armorOnEquip[1].equipmentBitmapID);
        this.shoesIconBitmap.texture = RES.getRes(hero.__armorOnEquip[2].equipmentBitmapID);
        //this.heroInformationTextField.text = this.heroInformationText;
        this.heroInformationTextField.textColor = hero.color;
    };
    p.getHeroInformations = function (hero) {
        this.heroInformationText = "";
        this.heroInformationText = "英雄 : " + hero.name + "\n";
        hero.getDefence();
        hero.getAttack();
        hero.getMaxHP();
        hero.getAglie();
        for (var i = 0; i < hero.properties.length; i++) {
            this.heroInformationText = this.heroInformationText + hero.properties[i].name + " : " + hero.properties[i].value.toFixed(0) + "\n";
        }
        this.heroInformationText = this.heroInformationText + "战斗力 : " + hero.getFightPower().toFixed(0);
        this.heroInformationTextField.text = this.heroInformationText;
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return UserPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(UserPanel,'UserPanel');
var EquipmentInformationPanel = (function (_super) {
    __extends(EquipmentInformationPanel, _super);
    function EquipmentInformationPanel() {
        _super.call(this);
        this.width = 250;
        this.height = 400;
        this.backGround = new egret.Bitmap();
        this.backGround.texture = RES.getRes("BlackBackground_png");
        this.backGround.width = 250;
        this.backGround.height = 400;
        this.addChild(this.backGround);
        this.backGround.x = 0;
        this.backGround.y = 0;
        this.backGround.alpha = 0.8;
        this.equipmentIconBitmap = new egret.Bitmap();
        this.equipmentIconBitmap.width = 60;
        this.equipmentIconBitmap.height = 60;
        this.addChild(this.equipmentIconBitmap);
        this.equipmentIconBitmap.x = 30;
        this.equipmentIconBitmap.y = 30;
        this.nameField = new egret.TextField();
        this.nameField.width = 200;
        this.nameField.height = 50;
        this.addChild(this.nameField);
        this.nameField.size = 24;
        this.nameField.x = 30;
        this.nameField.y = this.equipmentIconBitmap.y + this.equipmentIconBitmap.height + 50;
        this.propertiesField = new egret.TextField();
        this.propertiesField.width = 200;
        this.propertiesField.height = 300;
        this.addChild(this.propertiesField);
        this.propertiesField.textColor = 0xffffff;
        this.propertiesField.size = 20;
        this.propertiesField.x = 30;
        this.propertiesField.y = this.nameField.y + 55;
    }
    var d = __define,c=EquipmentInformationPanel,p=c.prototype;
    p.showEquipmentInformation = function (equipment) {
        this.nameField.text = equipment.name;
        this.nameField.textColor = equipment.color;
        this.equipmentIconBitmap.texture = RES.getRes(equipment.equipmentBitmapID);
        var information = "";
        for (var i = 0; i < equipment.properties.length; i++) {
            information = information + equipment.properties[i].name + " : " + equipment.properties[i].value.toFixed(0) + "\n" + "\n" + "\n";
        }
        this.propertiesField.text = information;
    };
    return EquipmentInformationPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(EquipmentInformationPanel,'EquipmentInformationPanel');
//# sourceMappingURL=UserPanel.js.map