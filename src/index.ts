import * as Blockly from 'blockly/core';
import { defineBlocks } from './blocks';
import { defineGenerators } from './generators';
import { PGZ_MSGS } from './msg';

export const initBlocklyPygameZero = (pythonGenerator: any) => {
    defineBlocks();
    defineGenerators(pythonGenerator);
    Object.assign(Blockly.Msg, PGZ_MSGS);
};

export { PGZ_MSGS };

export const toolboxXml = `
<xml xmlns="http://www.w3.org/1999/xhtml">
  <category name="Pygame Zero">
    <block type="draw_loop"></block>
    <block type="update_loop"></block>
    <block type="on_touch_event"></block>
    <block type="on_drag_event"></block>
    <block type="get_last_touch_position"></block>
    <block type="get_last_touch_position_property"></block>
    <block type="get_last_drag_distance"></block>
    <block type="actor"></block>
    <block type="actor_image"></block>
    <block type="get_actor_property"></block>
    <block type="actor_position"></block>
    <block type="actor_position_tuple"></block>
    <block type="actor_colliding"></block>
    <block type="actor_colliding_rect"></block>
    <block type="actor_draw"></block>
    <block type="animate"></block>
    <block type="animate_position"></block>
    <block type="screen_size"></block>
    <block type="screen_clear"></block>
    <block type="screen_fill"></block>
    <block type="screen_blit"></block>
    <block type="screen_create_rect"></block>
    <block type="screen_draw_line"></block>
    <block type="screen_draw_circle"></block>
    <block type="screen_draw_rectangle"></block>
    <block type="screen_draw_text"></block>
    <block type="format_font_name"></block>
    <block type="format_font_size"></block>
    <block type="format_font_color"></block>
    <block type="format_font_bgcolor"></block>
    <block type="format_text_position"></block>
    <block type="format_text_rotation"></block>
    <block type="format_text_align"></block>
    <block type="format_text_shadow"></block>
    <block type="clock_schedule"></block>
    <block type="clock_schedule_interval"></block>
    <block type="clock_unschedule"></block>
  </category>
</xml>
`;

export const workspaceXml = `
<xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
  <block type="draw_loop" id="m*0.,E:9nLXuTZ+nK)Ur" x="13" y="38"></block>
  <block type="update_loop" id=";r,#bh:(AZ*G.{20rgQx" x="263" y="38"></block>
</xml>
`;
