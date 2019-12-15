import {AbstractConverter} from "./AbstractConverter";
import {DeleteConverter} from "./DeleteConverter";
import Jimp from "@ozelot379/jimp-plugins";

/**
 * Class SpriteConverter
 */
class SpriteConverter extends AbstractConverter {
    /**
     * @inheritDoc
     */
    async convert() {
        const [width, height, sprites, to, additional_factor = 1] = this.data;

        const to_delete = [];

        let image = null;
        let factor = null;

        if (await this.output.exists(to)) {
            this.log.log(`Convert sprite ${to}`);

            image = await this.readImage(to); // Load already exists sprites image - Some texture packs have may a mix with sprites (1.13) and separate images (1.14)

            factor = (image.getWidth() / width);
        }

        for (const [sprite, x, y, factor_detect] of sprites) {
            if (!await this.output.exists(sprite)) {
                continue;
            }

            const image_sprite = await this.readImage(sprite);

            if (factor === null) {
                factor = (image_sprite.getWidth() / factor_detect * additional_factor); // Take the factor of the first image
            }

            if (image === null) {
                this.log.log(`Create sprite ${to}`);

                image = await this.createImage((width * factor), (height * factor));
            }

            const image_sprited_scaled = image_sprite.scale(((factor_detect * factor) / image_sprite.getWidth()), Jimp.RESIZE_NEAREST_NEIGHBOR);

            image.fillArea((x * factor), (y * factor), image_sprited_scaled.getWidth(), image_sprited_scaled.getHeight(), [0, 0, 0, 0]);  // Delete previous area, if the sprite already exists
            image.composite(image_sprited_scaled, (x * factor), (y * factor));

            to_delete.push(new DeleteConverter(sprite));
        }

        if (image !== null) {
            await this.writeImage(to, image);
        }

        return to_delete;
    }

    /**
     * @inheritDoc
     */
    static get DEFAULT_CONVERTER_DATA() {
        return [
            // Banner
            [512, 512, [
                ["textures/entity/banner_base.png", 0, 0, 64],
                ["textures/entity/banner/border.png", 64, 0, 64],
                ["textures/entity/banner/bricks.png", 128, 0, 64],
                ["textures/entity/banner/circle.png", 192, 0, 64],
                ["textures/entity/banner/creeper.png", 256, 0, 64],
                ["textures/entity/banner/cross.png", 320, 0, 64],
                ["textures/entity/banner/curly_border.png", 384, 0, 64],
                ["textures/entity/banner/diagonal_left.png", 448, 0, 64],
                ["textures/entity/banner/diagonal_right.png", 0, 64, 64],
                ["textures/entity/banner/diagonal_up_left.png", 64, 64, 64],
                ["textures/entity/banner/diagonal_up_right.png", 128, 64, 64],
                ["textures/entity/banner/flower.png", 192, 64, 64],
                ["textures/entity/banner/gradient.png", 256, 64, 64],
                ["textures/entity/banner/gradient_up.png", 320, 64, 64],
                ["textures/entity/banner/half_horizontal.png", 384, 64, 64],
                ["textures/entity/banner/half_horizontal_bottom.png", 448, 64, 64],
                ["textures/entity/banner/half_vertical.png", 0, 128, 64],
                ["textures/entity/banner/half_vertical_right.png", 64, 128, 64],
                ["textures/entity/banner/mojang.png", 128, 128, 64],
                ["textures/entity/banner/rhombus.png", 192, 128, 64],
                ["textures/entity/banner/skull.png", 256, 128, 64],
                ["textures/entity/banner/small_stripes.png", 320, 128, 64],
                ["textures/entity/banner/square_bottom_left.png", 384, 128, 64],
                ["textures/entity/banner/square_bottom_right.png", 448, 128, 64],
                ["textures/entity/banner/square_top_left.png", 0, 192, 64],
                ["textures/entity/banner/square_top_right.png", 64, 192, 64],
                ["textures/entity/banner/straight_cross.png", 128, 192, 64],
                ["textures/entity/banner/stripe_bottom.png", 192, 192, 64],
                ["textures/entity/banner/stripe_center.png", 256, 192, 64],
                ["textures/entity/banner/stripe_downleft.png", 320, 192, 64],
                ["textures/entity/banner/stripe_downright.png", 384, 192, 64],
                ["textures/entity/banner/stripe_left.png", 448, 192, 64],
                ["textures/entity/banner/stripe_middle.png", 0, 256, 64],
                ["textures/entity/banner/stripe_right.png", 64, 256, 64],
                ["textures/entity/banner/stripe_top.png", 128, 256, 64],
                ["textures/entity/banner/triangle_bottom.png", 192, 256, 64],
                ["textures/entity/banner/triangle_top.png", 256, 256, 64],
                ["textures/entity/banner/triangles_bottom.png", 320, 256, 64],
                ["textures/entity/banner/triangles_top.png", 384, 256, 64]
            ], "textures/entity/banner/banner.png"],

            // Painting
            [256, 256, [
                ["textures/painting/kebab.png", 0, 0, 16],
                ["textures/painting/aztec.png", 16, 0, 16],
                ["textures/painting/alban.png", 32, 0, 16],
                ["textures/painting/bomb.png", 64, 0, 16],
                ["textures/painting/aztec2.png", 48, 0, 16],
                ["textures/painting/plant.png", 80, 0, 16],
                ["textures/painting/wasteland.png", 96, 0, 16],
                ["textures/painting/back.png", 192, 0, 16],
                ["textures/painting/back.png", 208, 0, 16],
                ["textures/painting/back.png", 224, 0, 16],
                ["textures/painting/back.png", 240, 0, 16],
                ["textures/painting/back.png", 192, 16, 16],
                ["textures/painting/back.png", 208, 16, 16],
                ["textures/painting/back.png", 224, 16, 16],
                ["textures/painting/back.png", 240, 16, 16],
                ["textures/painting/back.png", 192, 32, 16],
                ["textures/painting/back.png", 208, 32, 16],
                ["textures/painting/back.png", 224, 32, 16],
                ["textures/painting/back.png", 240, 32, 16],
                ["textures/painting/back.png", 192, 48, 16],
                ["textures/painting/back.png", 208, 48, 16],
                ["textures/painting/back.png", 224, 48, 16],
                ["textures/painting/back.png", 240, 48, 16],
                ["textures/painting/pool.png", 0, 32, 32],
                ["textures/painting/courbet.png", 32, 32, 32],
                ["textures/painting/sea.png", 64, 32, 32],
                ["textures/painting/sunset.png", 96, 32, 32],
                ["textures/painting/creebet.png", 128, 32, 32],
                ["textures/painting/wanderer.png", 0, 64, 16],
                ["textures/painting/graham.png", 16, 64, 16],
                ["textures/painting/fighters.png", 0, 96, 64],
                ["textures/painting/skeleton.png", 192, 64, 64],
                ["textures/painting/donkey_kong.png", 192, 112, 64],
                ["textures/painting/match.png", 0, 128, 32],
                ["textures/painting/bust.png", 32, 128, 32],
                ["textures/painting/stage.png", 64, 128, 32],
                ["textures/painting/void.png", 96, 128, 32],
                ["textures/painting/skull_and_roses.png", 128, 128, 32],
                ["textures/painting/wither.png", 160, 128, 32],
                ["textures/painting/pointer.png", 0, 192, 64],
                ["textures/painting/pigscene.png", 64, 192, 64],
                ["textures/painting/burning_skull.png", 128, 192, 64]
            ], "textures/painting/kz.png"],

            // Particles
            [128, 128, [
                ["textures/particle/generic_0.png", 0, 0, 8],
                ["textures/particle/generic_1.png", 8, 0, 8],
                ["textures/particle/generic_2.png", 16, 0, 8],
                ["textures/particle/generic_3.png", 24, 0, 8],
                ["textures/particle/generic_4.png", 32, 0, 8],
                ["textures/particle/generic_5.png", 40, 0, 8],
                ["textures/particle/generic_6.png", 48, 0, 8],
                ["textures/particle/generic_7.png", 56, 0, 8],
                ["textures/particle/splash_0.png", 0, 8, 8],
                ["textures/particle/splash_0.png", 24, 8, 8],
                ["textures/particle/splash_1.png", 32, 8, 8],
                ["textures/particle/splash_2.png", 40, 8, 8],
                ["textures/particle/splash_3.png", 48, 8, 8],
                ["textures/particle/bubble.png", 0, 16, 8],
                ["textures/particle/flame.png", 0, 24, 8],
                ["textures/particle/lava.png", 8, 24, 8],
                ["textures/particle/note.png", 0, 32, 8],
                ["textures/particle/critical_hit.png", 8, 32, 8],
                ["textures/particle/enchanted_hit.png", 16, 32, 8],
                ["textures/particle/heart.png", 0, 40, 8],
                ["textures/particle/angry.png", 8, 40, 8],
                ["textures/particle/glint.png", 16, 40, 8],
                ["textures/particle/flash.png", 32, 16, 32],
                ["textures/particle/drip_hang.png", 0, 56, 8],
                ["textures/particle/drip_fall.png", 8, 56, 8],
                ["textures/particle/drip_land.png", 16, 58, 8],
                ["textures/particle/effect_0.png", 0, 64, 8],
                ["textures/particle/effect_1.png", 8, 64, 8],
                ["textures/particle/effect_2.png", 16, 64, 8],
                ["textures/particle/effect_3.png", 24, 64, 8],
                ["textures/particle/effect_4.png", 32, 64, 8],
                ["textures/particle/effect_5.png", 40, 64, 8],
                ["textures/particle/effect_6.png", 48, 64, 8],
                ["textures/particle/effect_7.png", 56, 64, 8],
                ["textures/particle/spell_0.png", 0, 72, 8],
                ["textures/particle/spell_1.png", 8, 72, 8],
                ["textures/particle/spell_2.png", 16, 72, 8],
                ["textures/particle/spell_3.png", 24, 72, 8],
                ["textures/particle/spell_4.png", 32, 72, 8],
                ["textures/particle/spell_5.png", 40, 72, 8],
                ["textures/particle/spell_6.png", 48, 72, 8],
                ["textures/particle/spell_7.png", 56, 72, 8],
                ["textures/particle/explosion_0.png", 0, 80, 8],
                ["textures/particle/explosion_1.png", 8, 80, 8],
                ["textures/particle/explosion_2.png", 16, 80, 8],
                ["textures/particle/explosion_3.png", 24, 80, 8],
                ["textures/particle/explosion_4.png", 32, 80, 8],
                ["textures/particle/explosion_5.png", 40, 80, 8],
                ["textures/particle/explosion_6.png", 48, 80, 8],
                ["textures/particle/explosion_7.png", 56, 80, 8],
                ["textures/particle/explosion_8.png", 64, 80, 8],
                ["textures/particle/explosion_9.png", 72, 80, 8],
                ["textures/particle/explosion_10.png", 80, 80, 8],
                ["textures/particle/explosion_11.png", 88, 80, 8],
                ["textures/particle/explosion_12.png", 96, 80, 8],
                ["textures/particle/explosion_13.png", 104, 80, 8],
                ["textures/particle/explosion_14.png", 112, 80, 8],
                ["textures/particle/explosion_15.png", 120, 80, 8],
                ["textures/particle/glitter_0.png", 0, 88, 8],
                ["textures/particle/glitter_1.png", 8, 88, 8],
                ["textures/particle/glitter_2.png", 16, 88, 8],
                ["textures/particle/glitter_3.png", 24, 88, 8],
                ["textures/particle/glitter_4.png", 32, 88, 8],
                ["textures/particle/glitter_5.png", 40, 88, 8],
                ["textures/particle/glitter_6.png", 48, 88, 8],
                ["textures/particle/glitter_7.png", 56, 88, 8],
                ["textures/particle/spark_0.png", 0, 96, 8],
                ["textures/particle/spark_1.png", 8, 96, 8],
                ["textures/particle/spark_2.png", 16, 96, 8],
                ["textures/particle/spark_3.png", 24, 96, 8],
                ["textures/particle/spark_4.png", 32, 96, 8],
                ["textures/particle/spark_5.png", 40, 96, 8],
                ["textures/particle/spark_6.png", 48, 96, 8],
                ["textures/particle/spark_7.png", 56, 96, 8],
                ["textures/particle/sga_a.png", 8, 112, 8],
                ["textures/particle/sga_b.png", 16, 112, 8],
                ["textures/particle/sga_c.png", 24, 112, 8],
                ["textures/particle/sga_d.png", 32, 112, 8],
                ["textures/particle/sga_e.png", 40, 112, 8],
                ["textures/particle/sga_f.png", 48, 112, 8],
                ["textures/particle/sga_g.png", 56, 112, 8],
                ["textures/particle/sga_h.png", 64, 112, 8],
                ["textures/particle/sga_i.png", 72, 112, 8],
                ["textures/particle/sga_j.png", 80, 112, 8],
                ["textures/particle/sga_k.png", 88, 112, 8],
                ["textures/particle/sga_l.png", 96, 112, 8],
                ["textures/particle/sga_m.png", 104, 112, 8],
                ["textures/particle/sga_n.png", 112, 112, 8],
                ["textures/particle/sga_o.png", 120, 112, 8],
                ["textures/particle/sga_p.png", 0, 120, 8],
                ["textures/particle/sga_q.png", 8, 120, 8],
                ["textures/particle/sga_r.png", 16, 120, 8],
                ["textures/particle/sga_s.png", 24, 120, 8],
                ["textures/particle/sga_t.png", 32, 120, 8],
                ["textures/particle/sga_u.png", 40, 120, 8],
                ["textures/particle/sga_v.png", 48, 120, 8],
                ["textures/particle/sga_w.png", 56, 120, 8],
                ["textures/particle/sga_x.png", 64, 120, 8],
                ["textures/particle/sga_y.png", 72, 120, 8],
                ["textures/particle/sga_z.png", 80, 120, 8]
            ], "textures/particle/particles.png", 4 /* Needs a minimal 4x factor because the explosion images are bigger than the others */], // 1.14
            [16, 192, [
                ["textures/particle/big_smoke_0.png", 0, 0, 16],
                ["textures/particle/big_smoke_1.png", 0, 16, 16],
                ["textures/particle/big_smoke_2.png", 0, 32, 16],
                ["textures/particle/big_smoke_3.png", 0, 48, 16],
                ["textures/particle/big_smoke_4.png", 0, 64, 16],
                ["textures/particle/big_smoke_5.png", 0, 80, 16],
                ["textures/particle/big_smoke_6.png", 0, 96, 16],
                ["textures/particle/big_smoke_7.png", 0, 112, 16],
                ["textures/particle/big_smoke_8.png", 0, 128, 16],
                ["textures/particle/big_smoke_9.png", 0, 144, 16],
                ["textures/particle/big_smoke_10.png", 0, 160, 16],
                ["textures/particle/big_smoke_11.png", 0, 176, 16]
            ], "textures/particle/campfire_smoke.png"]
        ];
    }
}

export {SpriteConverter};
