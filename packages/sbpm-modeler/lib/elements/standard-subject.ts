import * as joint from 'jointjs';

import { SVG_PREFIX, ShapeTypes } from '../variables';
import Canvas from './canvas';
import { SubjectOptions } from '../types';

/**
 * Default options used to create a new human subject.
 */
const humanSubjectDefaults = {
  size: {
    width: 90,
    height: 140
  },
  attrs: {
    image: {
      width: 90,
      height: 140,
      cursor: 'pointer'
    },
    text: {
      textWrap: {
        width: 150
      },
      xAlignment: '-60%',
      yAlignment: -90,
      pointerEvents: 'none',
      fontWeight: 'bold',
      lineHeight: 18
    }
  }
};

/**
 * Default options used to create a new machine subject.
 */
const machineSubjectDefaults = {
  size: {
    width: 110,
    height: 140
  },
  attrs: {
    image: {
      width: 110,
      height: 140,
      cursor: 'pointer'
    },
    text: {
      textWrap: {
        width: 150
      },
      xAlignment: '-52%',
      yAlignment: -100,
      pointerEvents: 'none',
      fontWeight: 'bold',
      lineHeight: 18
    }
  }
};

export default class StandardSubject {
  public static add(canvas: Canvas, options: SubjectOptions) {
    new StandardSubject(canvas, options);
  }

  constructor(canvas: Canvas, options: SubjectOptions) {
    const standardSubject = this.create(options);
    standardSubject.addTo(canvas.graph);
  }

  private create(options: SubjectOptions) {
    const { description, position, machine } = options;
    const defaults = this.getDefaults(machine);
    const icon = this.getIcon(machine);

    const standardSubject = new joint.shapes.basic.Image({
      ...defaults,
      type: ShapeTypes.STANDARD_SUBJECT
    });

    standardSubject.position(position.x, position.y);
    standardSubject.attr('image/xlinkHref', icon);
    standardSubject.attr('text/textWrap/text', description);

    return standardSubject;
  }

  private getDefaults(machine: boolean) {
    return machine ? machineSubjectDefaults : humanSubjectDefaults;
  }

  private getIcon(machine: boolean) {
    return machine ? this.machineSubjectIcon() : this.humanSubjectIcon();
  }

  private humanSubjectIcon() {
    const template = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg
       xmlns:dc="http://purl.org/dc/elements/1.1/"
       xmlns:cc="http://creativecommons.org/ns#"
       xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:svg="http://www.w3.org/2000/svg"
       xmlns="http://www.w3.org/2000/svg"
       id="svg8"
       version="1.1"
       viewBox="0 0 240.98796 407.40292"
       height="407.40292mm"
       width="240.98796mm">
      <defs
         id="defs2" />
      <metadata
         id="metadata5">
        <rdf:RDF>
          <cc:Work
             rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
               rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <g
         transform="translate(5609.2501,380.76095)"
         style="display:none"
         id="layer4">
        <g
           id="g1165">
          <g
             id="g1153">
            <path
               transform="rotate(35.083071,-289.44291,873.6563)"
               d="m -148.59267,988.11018 -208.70242,0 104.35121,-180.7416 z"
               id="path948"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path956"
               d="m -324.72806,987.85034 c -108.59128,142.37276 -110.57551,280.70856 59.83623,412.51626"
               style="fill:none;stroke:#b3b3b3;stroke-width:26.45833397;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <g
             id="g1157">
            <path
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="path974"
               d="m -148.59267,988.11018 -208.70242,0 104.35121,-180.7416 z"
               transform="rotate(-144.91693,-83.010974,1079.6561)" />
            <path
               style="fill:none;stroke:#b3b3b3;stroke-width:26.45833397;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="M 2.8002975,1252.6853 C 111.39157,1110.3126 113.3758,971.97675 -57.035941,840.16903"
               id="path976" />
          </g>
        </g>
        <path
           style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.62115765;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m -1262.1599,130.91712 a 35.901127,42.182886 0 0 0 35.2944,41.31194 v 0.0279 h 0.4752 a 35.901127,42.182886 0 0 0 0.095,0.006 35.901127,42.182886 0 0 0 0.1345,-0.006 h 210.4447 v -41.3398 z"
           id="path1154" />
        <path
           id="path1216"
           d="m -953.63935,-206.90666 a 28.25238,42.172221 0 0 0 -2.82051,0.21309 28.25238,42.172221 0 0 0 -2.7917,0.63185 28.25238,42.172221 0 0 0 -2.7363,1.04503 28.25238,42.172221 0 0 0 -2.65199,1.44768 28.25238,42.172221 0 0 0 -2.54209,1.83548 28.25238,42.172221 0 0 0 -2.40732,2.20528 28.25238,42.172221 0 0 0 -2.2475,2.5528 28.25238,42.172221 0 0 0 -2.06528,2.87492 28.25238,42.172221 0 0 0 -1.86272,3.16855 28.25238,42.172221 0 0 0 -1.64129,3.42996 28.25238,42.172221 0 0 0 -1.4038,3.6573 28.25238,42.172221 0 0 0 -1.15221,3.84872 28.25238,42.172221 0 0 0 -0.889,4.00111 28.25238,42.172221 0 0 0 -0.61759,4.11385 28.25238,42.172221 0 0 0 -0.3388,4.18508 28.25238,42.172221 0 0 0 -0.064,2.12414 h 42.82419 v -35.2381 a 28.25238,42.172221 0 0 0 -2.30198,-1.8813 28.25238,42.172221 0 0 0 -2.59983,-1.6453 28.25238,42.172221 0 0 0 -2.69719,-1.24945 28.25238,42.172221 0 0 0 -2.76719,-0.84123 28.25238,42.172221 0 0 0 -2.8098,-0.42495 28.25238,42.172221 0 0 0 -1.4161,-0.0546 z"
           style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1156"
           d="m -1166.1606,-206.91286 a 38.720117,42.182886 0 0 0 -0.1042,0.006 h -0.5123 v 0.0278 a 38.720117,42.182886 0 0 0 -38.0657,41.31192 h 265.79503 v -0.005 h -42.82429 a 28.25238,42.172221 0 0 1 0.064,-2.12413 28.25238,42.172221 0 0 1 0.3387,-4.18509 28.25238,42.172221 0 0 1 0.61761,-4.11384 28.25238,42.172221 0 0 1 0.889,-4.00111 28.25238,42.172221 0 0 1 1.15218,-3.84872 28.25238,42.172221 0 0 1 1.40383,-3.6573 28.25238,42.172221 0 0 1 1.64129,-3.42997 28.25238,42.172221 0 0 1 1.8628,-3.16855 28.25238,42.172221 0 0 1 2.06531,-2.87492 28.25238,42.172221 0 0 1 2.24748,-2.55279 28.25238,42.172221 0 0 1 2.40731,-2.20529 28.25238,42.172221 0 0 1 2.54201,-1.83547 28.25238,42.172221 0 0 1 2.65208,-1.44769 28.25238,42.172221 0 0 1 2.73621,-1.04503 28.25238,42.172221 0 0 1 2.7917,-0.63185 28.25238,42.172221 0 0 1 2.82048,-0.21309 h -212.37623 a 38.720117,42.182886 0 0 0 -0.1449,-0.006 z"
           style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1205"
           d="m -953.63917,-206.90665 a 28.25238,42.172221 0 0 0 -28.23239,41.33493 h 56.4565 a 28.25238,42.172221 0 0 0 -28.22411,-41.33493 z"
           style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:8.53386688;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1158"
           d="m -981.87156,-165.56649 h -222.92564 v 296.4838 h 152.6335 a 35.176352,42.182886 0 0 0 35.151,41.3454 35.176352,42.182886 0 0 0 35.14114,-41.3454 z"
           style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:9.52354527;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <g
           transform="translate(1905.0674,-65.89314)"
           id="g1280">
          <path
             id="path1220"
             d="m -2241.8133,-134.30036 a 28.25238,42.17222 0 0 0 -2.8205,0.21309 28.25238,42.17222 0 0 0 -2.7917,0.63185 28.25238,42.17222 0 0 0 -2.7363,1.04503 28.25238,42.17222 0 0 0 -2.652,1.44768 28.25238,42.17222 0 0 0 -2.5421,1.83548 28.25238,42.17222 0 0 0 -2.4073,2.20528 28.25238,42.17222 0 0 0 -2.2475,2.5528 28.25238,42.17222 0 0 0 -2.0653,2.87492 28.25238,42.17222 0 0 0 -1.8627,3.16855 28.25238,42.17222 0 0 0 -1.6413,3.42996 28.25238,42.17222 0 0 0 -1.4038,3.6573 28.25238,42.17222 0 0 0 -1.1522,3.84872 28.25238,42.17222 0 0 0 -0.889,4.00111 28.25238,42.17222 0 0 0 -0.6176,4.113849 28.25238,42.17222 0 0 0 -0.3388,4.185088 28.25238,42.17222 0 0 0 -0.064,2.124133 h 42.8242 v -35.2381 a 28.25238,42.17222 0 0 0 -2.302,-1.8813 28.25238,42.17222 0 0 0 -2.5998,-1.6453 28.25238,42.17222 0 0 0 -2.6972,-1.24945 28.25238,42.17222 0 0 0 -2.7672,-0.84123 28.25238,42.17222 0 0 0 -2.8098,-0.42495 28.25238,42.17222 0 0 0 -1.4161,-0.0546 z"
             style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1222"
             d="m -2454.3345,-134.30656 a 38.720119,42.182887 0 0 0 -0.1043,0.006 h -0.5122 v 0.0278 a 38.720119,42.182887 0 0 0 -38.0658,41.311924 h 265.7951 v -0.0049 h -42.8243 a 28.25238,42.17222 0 0 1 0.064,-2.124134 28.25238,42.17222 0 0 1 0.3387,-4.185088 28.25238,42.17222 0 0 1 0.6176,-4.113842 28.25238,42.17222 0 0 1 0.889,-4.00111 28.25238,42.17222 0 0 1 1.1522,-3.84872 28.25238,42.17222 0 0 1 1.4038,-3.6573 28.25238,42.17222 0 0 1 1.6413,-3.42997 28.25238,42.17222 0 0 1 1.8628,-3.16855 28.25238,42.17222 0 0 1 2.0653,-2.87492 28.25238,42.17222 0 0 1 2.2475,-2.55279 28.25238,42.17222 0 0 1 2.4073,-2.20529 28.25238,42.17222 0 0 1 2.542,-1.83547 28.25238,42.17222 0 0 1 2.6521,-1.44769 28.25238,42.17222 0 0 1 2.7362,-1.04503 28.25238,42.17222 0 0 1 2.7917,-0.63185 28.25238,42.17222 0 0 1 2.8205,-0.21309 h -212.3763 a 38.720119,42.182887 0 0 0 -0.1449,-0.006 z"
             style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1224"
             d="m -2241.8131,-134.30035 a 28.25238,42.172222 0 0 0 -28.2324,41.334938 h 56.4565 a 28.25238,42.172222 0 0 0 -28.2241,-41.334938 z"
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:8.53386784;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1226"
             d="m -2270.0455,-92.960186 h -222.9257 V 203.52362 h 152.6335 a 35.176352,42.182887 0 0 0 35.151,41.34539 35.176352,42.182887 0 0 0 35.1412,-41.34539 z"
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:9.52354622;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <g
             id="g1237"
             transform="rotate(180,-2123.161,62.016634)">
            <path
               id="path1228"
               d="m -2004.5544,-120.82988 a 28.25238,42.17222 0 0 1 2.8205,0.21309 28.25238,42.17222 0 0 1 2.7917,0.63185 28.25238,42.17222 0 0 1 2.7363,1.04503 28.25238,42.17222 0 0 1 2.652,1.44768 28.25238,42.17222 0 0 1 2.5421,1.83548 28.25238,42.17222 0 0 1 2.4073,2.20528 28.25238,42.17222 0 0 1 2.2475,2.5528 28.25238,42.17222 0 0 1 2.0653,2.87492 28.25238,42.17222 0 0 1 1.8627,3.16855 28.25238,42.17222 0 0 1 1.6413,3.42996 28.25238,42.17222 0 0 1 1.4038,3.657308 28.25238,42.17222 0 0 1 1.1522,3.84872 28.25238,42.17222 0 0 1 0.889,4.00111 28.25238,42.17222 0 0 1 0.6176,4.11384 28.25238,42.17222 0 0 1 0.3388,4.18509 28.25238,42.17222 0 0 1 0.064,2.12414 h -42.8242 v -35.238108 a 28.25238,42.17222 0 0 1 2.302,-1.8813 28.25238,42.17222 0 0 1 2.5998,-1.6453 28.25238,42.17222 0 0 1 2.6972,-1.24945 28.25238,42.17222 0 0 1 2.7672,-0.84123 28.25238,42.17222 0 0 1 2.8098,-0.42495 28.25238,42.17222 0 0 1 1.4161,-0.0546 z"
               style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1230"
               d="m -1792.0332,-120.83608 a 38.720119,42.182887 0 0 1 0.1043,0.006 h 0.5122 v 0.0278 a 38.720119,42.182887 0 0 1 38.0658,41.311928 h -265.7951 v -0.005 h 42.8243 a 28.25238,42.17222 0 0 0 -0.064,-2.12413 28.25238,42.17222 0 0 0 -0.3387,-4.18509 28.25238,42.17222 0 0 0 -0.6176,-4.11384 28.25238,42.17222 0 0 0 -0.889,-4.00111 28.25238,42.17222 0 0 0 -1.1522,-3.84872 28.25238,42.17222 0 0 0 -1.4038,-3.657308 28.25238,42.17222 0 0 0 -1.6413,-3.42997 28.25238,42.17222 0 0 0 -1.8628,-3.16855 28.25238,42.17222 0 0 0 -2.0653,-2.87492 28.25238,42.17222 0 0 0 -2.2475,-2.55279 28.25238,42.17222 0 0 0 -2.4073,-2.20529 28.25238,42.17222 0 0 0 -2.542,-1.83547 28.25238,42.17222 0 0 0 -2.6521,-1.44769 28.25238,42.17222 0 0 0 -2.7362,-1.04503 28.25238,42.17222 0 0 0 -2.7917,-0.63185 28.25238,42.17222 0 0 0 -2.8205,-0.21309 h 212.3763 a 38.720119,42.182887 0 0 1 0.1449,-0.006 z"
               style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1232"
               d="m -2004.5546,-120.82987 a 28.25238,42.172222 0 0 1 28.2324,41.334938 h -56.4565 a 28.25238,42.172222 0 0 1 28.2241,-41.334938 z"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:8.53386784;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
        </g>
        <g
           transform="matrix(0.99999999,0,0,-0.99999999,1761.1341,73.57649)"
           id="g1270">
          <path
             style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.62115765;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1826.319,224.32694 a 35.901128,42.182887 0 0 0 35.2944,41.31192 v 0.0279 h 0.4753 a 35.901128,42.182887 0 0 0 0.095,0.006 35.901128,42.182887 0 0 0 0.1345,-0.006 h 210.4446 v -41.3398 z"
             id="path1255" />
          <path
             id="path1257"
             d="m -1517.7984,-113.49685 a 28.25238,42.17222 0 0 0 -2.8205,0.21309 28.25238,42.17222 0 0 0 -2.7917,0.63185 28.25238,42.17222 0 0 0 -2.7363,1.04503 28.25238,42.17222 0 0 0 -2.652,1.44768 28.25238,42.17222 0 0 0 -2.5421,1.83548 28.25238,42.17222 0 0 0 -2.4073,2.20528 28.25238,42.17222 0 0 0 -2.2475,2.5528 28.25238,42.17222 0 0 0 -2.0653,2.87492 28.25238,42.17222 0 0 0 -1.8627,3.168546 28.25238,42.17222 0 0 0 -1.6413,3.42996 28.25238,42.17222 0 0 0 -1.4038,3.6573 28.25238,42.17222 0 0 0 -1.1522,3.84872 28.25238,42.17222 0 0 0 -0.889,4.001107 28.25238,42.17222 0 0 0 -0.6176,4.113849 28.25238,42.17222 0 0 0 -0.3388,4.185088 28.25238,42.17222 0 0 0 -0.064,2.124133 h 42.8242 v -35.238093 a 28.25238,42.17222 0 0 0 -2.302,-1.8813 28.25238,42.17222 0 0 0 -2.5998,-1.6453 28.25238,42.17222 0 0 0 -2.6972,-1.24945 28.25238,42.17222 0 0 0 -2.7672,-0.84123 28.25238,42.17222 0 0 0 -2.8098,-0.42495 28.25238,42.17222 0 0 0 -1.4161,-0.0546 z"
             style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1259"
             d="m -1730.3196,-113.50305 a 38.720119,42.182887 0 0 0 -0.1043,0.006 h -0.5122 v 0.0278 a 38.720119,42.182887 0 0 0 -38.0658,41.311917 h 265.7951 v -0.0049 h -42.8243 a 28.25238,42.17222 0 0 1 0.064,-2.124134 28.25238,42.17222 0 0 1 0.3387,-4.185088 28.25238,42.17222 0 0 1 0.6176,-4.113844 28.25238,42.17222 0 0 1 0.889,-4.001105 28.25238,42.17222 0 0 1 1.1522,-3.84872 28.25238,42.17222 0 0 1 1.4038,-3.6573 28.25238,42.17222 0 0 1 1.6413,-3.42997 28.25238,42.17222 0 0 1 1.8628,-3.168546 28.25238,42.17222 0 0 1 2.0653,-2.87492 28.25238,42.17222 0 0 1 2.2475,-2.55279 28.25238,42.17222 0 0 1 2.4073,-2.20529 28.25238,42.17222 0 0 1 2.542,-1.83547 28.25238,42.17222 0 0 1 2.6521,-1.44769 28.25238,42.17222 0 0 1 2.7362,-1.04503 28.25238,42.17222 0 0 1 2.7917,-0.63185 28.25238,42.17222 0 0 1 2.8205,-0.21309 h -212.3763 a 38.720119,42.182887 0 0 0 -0.1449,-0.006 z"
             style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1261"
             d="m -1517.7982,-113.49684 a 28.25238,42.172222 0 0 0 -28.2324,41.334931 h 56.4565 a 28.25238,42.172222 0 0 0 -28.2241,-41.334931 z"
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:8.53386784;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1263"
             d="m -1546.0306,-72.156683 h -222.9257 V 224.32713 h 152.6335 a 35.176352,42.182887 0 0 0 35.151,41.34539 35.176352,42.182887 0 0 0 35.1412,-41.34539 z"
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:9.52354622;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer15">
        <g
           transform="translate(-11.910411,-17.946055)"
           id="g1222">
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:10;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1200"
             width="272.65573"
             height="266.18573"
             x="-2857.7981"
             y="-1520.1621"
             ry="0"
             transform="rotate(-45)" />
          <g
             id="g1216"
             transform="translate(-0.00454883,-4.4980133)">
            <rect
               y="861.14423"
               x="-2915.9172"
               height="122.95383"
               width="21.491327"
               id="rect1204"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <rect
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.93906879;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect1206"
               width="22.077242"
               height="22.077242"
               x="-2916.2102"
               y="1013.1955" />
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer16">
        <g
           id="g1408">
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1253"
             width="116.91481"
             height="110.76139"
             x="-3577.002"
             y="1302.7863" />
          <rect
             y="1540.7631"
             x="-3577.002"
             height="110.76139"
             width="116.91481"
             id="rect1255"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1257"
             width="116.91481"
             height="110.76139"
             x="-3830.8301"
             y="1540.7631" />
          <rect
             y="1540.7631"
             x="-3320.1946"
             height="110.76139"
             width="116.91481"
             id="rect1259"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1736-0"
             d="m -3810.327,1592.6126 26.5345,26.5344 49.3741,-49.3741"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3556.4989,1592.6126 26.5345,26.5344 49.3741,-49.3741"
             id="path1284" />
          <g
             id="g1312"
             transform="translate(-455.91977,114.73478)">
            <path
               style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -2832.786,1508.8817 53.9372,-54.9454"
               id="path1738-8" />
            <g
               style="stroke:#b3b3b3;stroke-width:15.88381767;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               transform="matrix(0.59414015,0,0,0.60524511,-1165.1316,603.45053)"
               id="g1291">
              <path
                 style="fill:none;stroke:#b3b3b3;stroke-width:15.88381767;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2806.8368,1405.1923 90.782,90.782"
                 id="path1288" />
            </g>
          </g>
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3518.5445,1435.9958 v 82.3192"
             id="path1744-0" />
          <path
             id="path1358"
             d="m -3256.8775,1477.1554 h -520.2369"
             style="fill:none;stroke:#b3b3b3;stroke-width:11.34523773;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1360"
             d="m -3772.3727,1474.9102 v 43.4048"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1362"
             d="m -3261.7372,1472.6612 v 45.6538"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.76864529;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
        <g
           id="g1392">
          <rect
             y="1302.7863"
             x="-2933.417"
             height="110.76139"
             width="116.91481"
             id="rect1368"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1370"
             width="116.91481"
             height="110.76139"
             x="-2933.417"
             y="1540.7631" />
          <path
             id="path1372"
             d="m -2912.9139,1354.6358 26.5345,26.5344 49.3741,-49.3741"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1374"
             d="m -2874.9595,1435.9958 v 82.3192"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <g
             transform="translate(-69.142187,114.73478)"
             id="g1382">
            <path
               id="path1376"
               d="m -2832.786,1508.8817 53.9372,-54.9454"
               style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <g
               id="g1380"
               transform="matrix(0.59414015,0,0,0.60524511,-1165.1316,603.45053)"
               style="stroke:#b3b3b3;stroke-width:15.88381767;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1">
              <path
                 id="path1378"
                 d="m -2806.8368,1405.1923 90.782,90.782"
                 style="fill:none;stroke:#b3b3b3;stroke-width:15.88381767;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer14">
        <path
           id="rect1161"
           d="m -3552.3573,751.86603 c -27.3627,0 -49.3913,22.02891 -49.3913,49.39183 v 23.51844 h -98.4885 v 96.6587 h 24.1183 c 27.363,0 49.3919,22.0285 49.3919,49.3913 0,27.3629 -22.0289,49.3913 -49.3919,49.3913 h -24.1183 v 96.6588 h 96.6586 v -24.1179 c 0,-27.363 22.0287,-49.3925 49.3914,-49.3925 27.3629,0 49.3913,22.0295 49.3913,49.3925 v 24.1179 h 96.6587 v -96.6588 h 23.8315 c 27.3629,0 49.3919,-22.0284 49.3919,-49.3913 0,-27.3628 -22.029,-49.3913 -49.3919,-49.3913 h -23.8315 v -96.6587 h -94.8288 v -23.51844 c 0,-27.36292 -22.0284,-49.39183 -49.3914,-49.39183 z"
           style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:10;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer13">
        <g
           transform="translate(-20.653077,-452.6035)"
           id="g5454">
          <g
             id="g5385"
             transform="translate(0,8.2052571)">
            <path
               id="path1399"
               d="m -3062.8724,990.56693 a 35.901128,42.182887 0 0 0 35.2944,41.31187 v 0.028 h 0.4753 a 35.901128,42.182887 0 0 0 0.095,0.01 35.901128,42.182887 0 0 0 0.1345,-0.01 h 210.4446 v -41.33977 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.62115765;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1413"
               d="m -2739.7604,694.07811 v 0 h -42.8236 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.99174976;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1443"
               d="m -2757.1721,652.95607 a 28.25238,42.17222 0 0 0 -2.7911,0.63201 28.25238,42.17222 0 0 0 -2.0907,0.79838 28.25238,42.17222 0 0 0 -3.2975,1.69397 28.25238,42.17222 0 0 0 -2.5422,1.83555 28.25238,42.17222 0 0 0 -2.4069,2.20503 28.25238,42.17222 0 0 0 -7.8171,12.02614 28.25238,42.17222 0 0 0 -1.4036,3.65765 28.25238,42.17222 0 0 0 -1.1523,3.84834 28.25238,42.17222 0 0 0 -0.8895,4.00079 28.25238,42.17222 0 0 0 -1.02,10.42262 h 42.8236 13.633 a 28.25238,42.17222 0 0 0 -28.2242,-41.33495 28.25238,42.17222 0 0 0 -2.8205,0.21291 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.99174976;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1403"
               d="m -2966.8735,652.73697 a 38.720119,42.182885 0 0 0 -0.1039,0.006 h -0.5123 v 0.0279 a 38.720119,42.182885 0 0 0 -38.0658,41.3122 h 0.046 v 296.41914 h 152.6331 a 35.176351,42.249119 0 0 0 35.1512,41.41039 35.176351,42.249119 0 0 0 35.1412,-41.41039 V 694.08274 h 42.8236 v -0.004 h -42.8236 v -0.0169 a 28.25238,42.17222 0 0 1 0.063,-2.10685 28.25238,42.17222 0 0 1 0.3384,-4.18528 28.25238,42.17222 0 0 1 0.618,-4.11345 28.25238,42.17222 0 0 1 0.889,-4.00079 28.25238,42.17222 0 0 1 1.1523,-3.84887 28.25238,42.17222 0 0 0 -1.1517,3.84887 28.25238,42.17222 0 0 1 1.1522,-3.84834 28.25238,42.17222 0 0 1 1.4037,-3.65766 28.25238,42.17222 0 0 1 1.6406,-3.42976 28.25238,42.17222 0 0 1 1.863,-3.16828 28.25238,42.17222 0 0 1 2.065,-2.87528 28.25238,42.17222 0 0 1 2.2479,-2.55281 28.25238,42.17222 0 0 1 2.407,-2.20504 28.25238,42.17222 0 0 1 2.5421,-1.83554 28.25238,42.17222 0 0 1 2.6514,-1.44746 28.25238,42.17222 0 0 1 0.6461,-0.24651 28.25238,42.17222 0 0 1 2.0902,-0.79891 28.25238,42.17222 0 0 1 2.7916,-0.63148 28.25238,42.17222 0 0 1 2.8194,-0.21341 h -212.3763 a 38.720119,42.182885 0 0 0 -0.1442,-0.006 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.99174976;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.53386784;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -2754.3516,652.74312 a 28.25238,42.172222 0 0 0 -28.2324,41.33493 h 56.4565 a 28.25238,42.172222 0 0 0 -28.2241,-41.33493 z"
               id="path1405" />
          </g>
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -2973.0999,754.99302 h 157.1547"
             id="path1744-2" />
          <path
             id="path5410"
             d="m -2973.0999,880.71661 h 157.1547"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -2973.0999,817.85481 h 107.7633"
             id="path5412" />
          <path
             id="path5414"
             d="m -2973.0999,943.5784 h 107.7633"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
        <g
           transform="translate(-29.633333,-446.61666)"
           id="g5464">
          <g
             id="g1636">
            <path
               id="path1626"
               d="m -2413.6718,660.33174 v 10e-4 a 38.720119,42.276466 0 0 0 -0.1034,0.006 h -0.5121 v 0.0279 a 38.720119,42.276466 0 0 0 -38.0659,41.40317 h 0.045 v 296.64495 h 0.01 a 38.720119,42.182885 0 0 0 38.0571,41.06004 v 0.028 h 0.5121 a 38.720119,42.182885 0 0 0 0.1044,0.01 l -5e-4,5e-4 a 38.720119,42.182885 0 0 0 0.1447,-0.01 h 212.3762 a 28.25238,42.17222 0 0 1 -2.82,-0.2129 28.25238,42.17222 0 0 1 -2.7921,-0.632 28.25238,42.17222 0 0 1 -2.7363,-1.0449 28.25238,42.17222 0 0 1 -2.652,-1.448 28.25238,42.17222 0 0 1 -2.542,-1.8355 28.25238,42.17222 0 0 1 -2.4071,-2.205 28.25238,42.17222 0 0 1 -2.2474,-2.5529 28.25238,42.17222 0 0 1 -2.0655,-2.8747 28.25238,42.17222 0 0 1 -1.8629,-3.1688 28.25238,42.17222 0 0 1 -1.6413,-3.4298 28.25238,42.17222 0 0 1 -1.4035,-3.6576 28.25238,42.17222 0 0 1 -1.1524,-3.8484 28.25238,42.17222 0 0 1 -0.8888,-4.0013 28.25238,42.17222 0 0 1 -0.6175,-4.114 28.25238,42.17222 0 0 1 -0.339,-4.1847 28.25238,42.17222 0 0 1 -0.064,-2.12442 h 42.8242 v -0.005 h -42.8697 V 701.77004 h 42.8238 v -0.005 h -42.8238 a 28.25238,42.265777 0 0 1 0,-5e-4 v -0.0176 a 28.25238,42.265777 0 0 1 0.01,-0.1602 28.25238,42.265777 0 0 1 0.053,-1.74874 28.25238,42.265777 0 0 0 0,0.0217 28.25238,42.265777 0 0 1 0.01,-0.22376 28.25238,42.265777 0 0 1 0.199,-2.46083 28.25238,42.265777 0 0 0 -0.017,0.22944 28.25238,42.265777 0 0 1 0.1458,-1.80094 28.25238,42.265777 0 0 0 0,0.0171 28.25238,42.265777 0 0 1 0.014,-0.17931 28.25238,42.265777 0 0 1 0.3767,-2.5146 28.25238,42.265777 0 0 0 -0.022,0.15298 28.25238,42.265777 0 0 1 0.2388,-1.59525 28.25238,42.265777 0 0 0 0,0.0119 28.25238,42.265777 0 0 1 0.027,-0.17828 28.25238,42.265777 0 0 1 0.585,-2.63964 28.25238,42.265777 0 0 0 -0.039,0.1814 28.25238,42.265777 0 0 1 0.3034,-1.36893 28.25238,42.265777 0 0 0 0,0.009 28.25238,42.265777 0 0 1 0.042,-0.19119 28.25238,42.265777 0 0 1 0.8274,-2.76934 28.25238,42.265777 0 0 0 -0.038,0.12919 28.25238,42.265777 0 0 1 0.3033,-1.01856 28.25238,42.265777 0 0 1 0,-0.004 28.25238,42.265777 0 0 1 0.057,-0.19431 28.25238,42.265777 0 0 1 1.0237,-2.67166 28.25238,42.265777 0 0 1 0.039,-0.10334 28.25238,42.265777 0 0 1 0.2693,-0.70282 28.25238,42.265777 0 0 0 0,0.008 28.25238,42.265777 0 0 1 0.075,-0.19535 28.25238,42.265777 0 0 1 1.309,-2.74246 28.25238,42.265777 0 0 0 -0.055,0.11782 28.25238,42.265777 0 0 1 0.2956,-0.62013 28.25238,42.265777 0 0 1 0,-0.003 28.25238,42.265777 0 0 1 0.09,-0.19069 28.25238,42.265777 0 0 1 1.5839,-2.7001 28.25238,42.265777 0 0 0 -0.072,0.12404 28.25238,42.265777 0 0 1 0.2455,-0.4191 28.25238,42.265777 0 0 0 -0.01,0.008 28.25238,42.265777 0 0 1 0.1106,-0.18862 28.25238,42.265777 0 0 1 1.8298,-2.55227 28.25238,42.265777 0 0 0 -0.072,0.10178 28.25238,42.265777 0 0 1 0.1891,-0.26405 28.25238,42.265777 0 0 0 -0.01,0.009 28.25238,42.265777 0 0 1 0.1271,-0.17621 28.25238,42.265777 0 0 1 2.066,-2.3518 28.25238,42.265777 0 0 0 -0.07,0.0811 28.25238,42.265777 0 0 1 0.1163,-0.13229 28.25238,42.265777 0 0 0 -0.01,0.006 28.25238,42.265777 0 0 1 0.1421,-0.16123 28.25238,42.265777 0 0 1 2.2526,-2.06862 28.25238,42.265777 0 0 1 13.6974,-5.32627 h -212.3762 a 38.720119,42.276466 0 0 0 -0.1442,-0.006 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1514"
               transform="scale(0.26458333)"
               d="m -8318.8164,2495.9688 a 106.54019,164.51882 0 0 0 -106.4648,161.2539 h 212.8984 a 106.54019,164.51882 0 0 0 -106.4336,-161.2539 z m -107.1875,155.1914 a 106.78065,159.74467 0 0 0 -0.037,1.1796 106.78065,159.74467 0 0 1 0.037,-0.6718 106.78065,159.74467 0 0 1 0,-0.5078 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:36;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1463"
               d="m -2229.0496,996.12973 a 28.413993,43.989193 0 0 0 0.034,1.17047 h -0.01 a 28.25238,42.17222 0 0 0 0.064,2.12391 28.25238,42.17222 0 0 0 0.339,4.18529 28.25238,42.17222 0 0 0 0.6175,4.114 28.25238,42.17222 0 0 0 0.8889,4.0008 28.25238,42.17222 0 0 0 1.1524,3.8489 28.25238,42.17222 0 0 0 1.4035,3.6571 28.25238,42.17222 0 0 0 1.6417,3.4303 28.25238,42.17222 0 0 0 1.3839,2.3549 28.413993,43.989193 0 0 0 20.8737,14.2301 28.413993,43.989193 0 0 0 28.3859,-43.11577 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.99174976;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <path
             id="path5428"
             d="m -2419.3174,754.99302 h 157.1547"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -2419.3174,880.71661 h 157.1547"
             id="path5430" />
          <path
             id="path5432"
             d="m -2419.3174,817.85481 h 107.7633"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -2419.3174,943.5784 h 107.7633"
             id="path5434" />
        </g>
        <g
           transform="translate(-29.633333,-446.61666)"
           id="g5474">
          <g
             id="g1660"
             transform="translate(0,2.0798819)">
            <path
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -1862.3022,700.42602 a 35.901128,42.182887 0 0 1 35.2944,-41.31192 v -0.0279 h 0.4753 a 35.901128,42.182887 0 0 1 0.095,-0.006 35.901128,42.182887 0 0 1 0.1345,0.006 h 210.4446 v 41.3398 z"
               id="path1638" />
            <path
               id="path1640"
               transform="scale(0.26458333)"
               d="m -5979.2656,3767.8672 a 106.78065,159.39107 0 0 0 0.1211,4.0156 106.78065,159.39107 0 0 0 0.1211,4.0137 106.78065,159.39107 0 0 0 1.2793,15.8164 106.78065,159.39107 0 0 0 2.334,15.5469 106.78065,159.39107 0 0 0 7.7148,29.668 106.78065,159.39107 0 0 0 5.3067,13.8242 106.78065,159.39107 0 0 0 6.2031,12.9629 106.78065,159.39107 0 0 0 2.6055,4.4355 106.78065,159.39107 0 0 0 4.4336,7.5411 106.78065,159.39107 0 0 0 7.8066,10.8652 106.78065,159.39107 0 0 0 8.4941,9.6484 106.78065,159.39107 0 0 0 0.3829,0.3516 106.78065,159.39107 0 0 0 28.3476,20.3926 106.78065,159.39107 0 0 0 10.3399,3.9492 106.78065,159.39107 0 0 0 5.2754,1.1934 106.78065,159.39107 0 0 0 5.2754,1.1953 106.78065,159.39107 0 0 0 10.6602,0.8047 v 0 a 106.78065,159.39107 0 0 0 5.3515,-0.207 106.78065,159.39107 0 0 0 10.6192,-1.6075 106.78065,159.39107 0 0 0 10.4609,-3.1796 106.78065,159.39107 0 0 0 10.1934,-4.7207 106.78065,159.39107 0 0 0 9.8261,-6.2188 106.78065,159.39107 0 0 0 8.7012,-7.1113 106.78065,159.39107 0 0 0 51.5215,-133.1836 h -51.5215 -161.8555 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:36;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1642"
               transform="scale(0.26458333)"
               d="m -6112.082,2491.0117 a 132.94999,160.92976 0 0 0 -132.8535,157.7363 h -576.8829 v 1119.086 h -0.1718 a 146.34376,159.43138 0 0 0 0.1718,5.0117 v 7.002 h 0.6504 a 146.34376,159.43138 0 0 0 143.0469,144.125 v 0.1074 h 1.9375 a 146.34376,159.43138 0 0 0 0.3926,0.037 146.34376,159.43138 0 0 0 0.5469,-0.039 h 802.6816 a 106.78065,159.39107 0 0 1 -10.6602,-0.8047 106.78065,159.39107 0 0 1 -10.5527,-2.3886 106.78065,159.39107 0 0 1 -10.3398,-3.9493 106.78065,159.39107 0 0 1 -10.0254,-5.4707 106.78065,159.39107 0 0 1 -9.6074,-6.9375 106.78065,159.39107 0 0 1 -9.0977,-8.3359 106.78065,159.39107 0 0 1 -8.4941,-9.6484 106.78065,159.39107 0 0 1 -7.8067,-10.8653 106.78065,159.39107 0 0 1 -7.041,-11.9746 106.78065,159.39107 0 0 1 -6.2031,-12.9648 106.78065,159.39107 0 0 1 -5.3047,-13.8223 106.78065,159.39107 0 0 1 -4.3555,-14.5469 106.78065,159.39107 0 0 1 -3.3594,-15.1211 106.78065,159.39107 0 0 1 -2.3339,-15.5488 106.78065,159.39107 0 0 1 -1.2813,-15.8183 106.78065,159.39107 0 0 1 -0.2402,-7.9629 v -0.064 h 161.8554 v -0.02 h -161.8554 V 2648.748 a 132.94999,160.92976 0 0 0 -132.8164,-157.7363 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:36;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1773.45,754.99302 h 157.1547"
             id="path5436" />
          <path
             id="path5438"
             d="m -1773.45,880.71661 h 157.1547"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1773.45,817.85481 h 107.7633"
             id="path5440" />
          <path
             id="path5442"
             d="m -1773.45,943.5784 h 107.7633"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer12">
        <g
           id="g1746"
           transform="translate(15.242344,-268.12178)">
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3633.3134,800.4038 26.5345,26.53439 49.3741,-49.37413"
             id="path1742" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3554.6809,803.93492 h 116.7435"
             id="path1744" />
        </g>
        <g
           transform="translate(0,3.1991768)"
           id="g1669">
          <path
             style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3459.4755,230.77893 h 63.5641 v 373.71319 h -252.3109 v -373.71319 0 h 63.5639"
             id="path1659" />
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1654"
             width="106.26636"
             height="43.404568"
             x="-3575.2"
             y="206.51517" />
        </g>
        <g
           transform="translate(15.242344,-472.18221)"
           id="g1685">
          <path
             id="path1675"
             d="m -3633.3134,800.4038 26.5345,26.53439 49.3741,-49.37413"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1677"
             d="m -3554.6809,803.93492 h 116.7435"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
        <g
           id="g1691"
           transform="translate(15.242344,-370.49409)">
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3633.3134,800.4038 26.5345,26.53439 49.3741,-49.37413"
             id="path1687" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3554.6809,803.93492 h 116.7435"
             id="path1689" />
        </g>
        <g
           id="g1734"
           transform="translate(15.242344,-472.18221)">
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3633.3134,800.4038 26.5345,26.53439 49.3741,-49.37413"
             id="path1730" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3554.6809,803.93492 h 116.7435"
             id="path1732" />
        </g>
        <g
           transform="translate(15.242344,-370.49409)"
           id="g1740">
          <path
             id="path1736"
             d="m -3633.3134,800.4038 26.5345,26.53439 49.3741,-49.37413"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1738"
             d="m -3554.6809,803.93492 h 116.7435"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer11">
        <g
           id="g1618"
           transform="translate(-3432.6159,-481.66384)">
          <g
             id="g1602"
             transform="matrix(1.2709081,0,0,1.2709081,1865.1379,0.22557841)">
            <g
               id="g1600"
               transform="translate(-910.16664,-28.574999)">
              <rect
                 y="1343.5273"
                 x="-1338.2998"
                 height="135.789"
                 width="225.30016"
                 id="rect1596"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.07827234;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 id="path1598"
                 d="m -1338.0126,1343.8157 112.3628,74.2523 112.3628,-74.2523 z"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.49464083;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
          </g>
          <path
             id="path1604"
             d="m -820.36353,1843.3955 65.98588,-61.5581 v 39.6043 h 136.66798 v 43.9088 h -136.66798 v 39.604 z"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:3.9000001;stroke-dasharray:none;stroke-opacity:1" />
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer10">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1611">
          <g
             transform="matrix(1.2709081,0,0,1.2709081,1850.3212,-347.96608)"
             id="g1536">
            <g
               transform="translate(-910.16664,-28.574999)"
               id="g1534">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.07827234;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect1530"
                 width="225.30016"
                 height="135.789"
                 x="-1338.2998"
                 y="1343.5273" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.49464083;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1338.0126,1343.8157 112.3628,74.2523 112.3628,-74.2523 z"
                 id="path1532" />
            </g>
          </g>
          <path
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:3.9000001;stroke-dasharray:none;stroke-opacity:1"
             d="m -632.52612,1495.2038 -65.98588,-61.5581 v 39.6043 h -136.66798 v 43.9088 H -698.512 v 39.604 z"
             id="path1538" />
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer18">
        <g
           transform="translate(-3445.2827,-503.91183)"
           id="g1180"
           style="opacity:1">
          <g
             id="g1059"
             transform="translate(841.15064,-91.299268)">
            <path
               id="path1053"
               d="m -1897.6137,-108.02079 28.7833,28.783345 -119.5134,119.513439 -119.5134,-119.513439 v 0 l 28.7832,-28.783285"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -1897.6137,-178.39995 28.7833,28.78334 -119.5134,119.513441 -119.5135,-119.513441 v 0 l 28.7833,-28.78327"
               id="path1055" />
            <rect
               transform="rotate(-45)"
               y="-1645.6665"
               x="-1335.2939"
               height="169.01753"
               width="169.01753"
               id="rect1057"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <g
             transform="translate(-30.415683,-859.12656)"
             id="g1116-3">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-9-9"
               cx="-1058.0662"
               cy="488.59421"
               r="63.47197" />
            <g
               transform="matrix(0.99747158,0,0,1.0000051,-569.07842,-456.7783)"
               id="g1292-0">
              <path
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -470.11869,913.62885 a 41.976201,37.842234 0 0 1 21.5246,33.04689 v 0 a 41.976201,37.842234 0 0 1 -21.5087,33.03885"
                 id="path1018-8" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="path1020-8"
                 d="m -774.89979,793.71478 -94.99016,164.52778 -94.99016,-164.52778 z"
                 transform="matrix(0.20172907,0,0,0.18216379,-303.18889,753.04177)" />
              <path
                 id="path1040-5"
                 d="m -510.55801,977.35622 a 41.976201,37.842234 0 0 1 -21.52462,-33.04686 v 0 a 41.976201,37.842234 0 0 1 21.50872,-33.03887"
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 d="m 1113.3891,-1384.702 -94.9901,164.5278 -94.99017,-164.5278 z"
                 id="path1042-0"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 transform="matrix(-0.20175844,0,0,-0.18188853,-296.58256,741.24642)" />
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="g2259"
         style="opacity:1">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g2330">
          <g
             transform="translate(401.1181,-91.299268)"
             id="g2257">
            <path
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -1897.6137,-108.02079 28.7833,28.783345 -119.5134,119.513439 -119.5134,-119.513439 v 0 l 28.7832,-28.783285"
               id="path2251" />
            <path
               id="path2253"
               d="m -1897.6137,-178.39995 28.7833,28.78334 -119.5134,119.513441 -119.5135,-119.513441 v 0 l 28.7833,-28.78327"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <rect
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect2255"
               width="169.01753"
               height="169.01753"
               x="-1335.2939"
               y="-1645.6665"
               transform="rotate(-45)" />
          </g>
          <g
             style="display:inline;opacity:1"
             id="g1235-2"
             transform="translate(-1090.462,-1231.0121)">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-47"
               cx="-437.74243"
               cy="860.28735"
               r="63.47197" />
            <path
               d="m -392.53712,856.72405 -0.0388,7.58774 -90.37182,-0.46108 0.0388,-7.58775 z m -48.99918,-41.62316 7.58784,-7e-5 2e-5,90.373 -7.58786,6e-5 z"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.32291663;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect926-7" />
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         style="opacity:1"
         id="layer9">
        <g
           transform="translate(-3504.5617,-599.55605)"
           id="g2229">
          <path
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1897.6137,-108.02079 28.7833,28.783345 -119.5134,119.513439 -119.5134,-119.513439 v 0 l 28.7832,-28.783285"
             id="path2222" />
          <path
             id="path2224"
             d="m -1897.6137,-178.39995 28.7833,28.78334 -119.5134,119.513441 -119.5135,-119.513441 v 0 l 28.7833,-28.78327"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1932"
             width="169.01753"
             height="169.01753"
             x="-1335.2939"
             y="-1645.6665"
             transform="rotate(-45)" />
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         style="display:inline"
         id="layer8">
        <g
           id="g2981">
          <circle
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="path2691"
             cx="-4984.4209"
             cy="1733.2588"
             r="183.6758" />
          <g
             id="g1626-0-0"
             transform="matrix(0.76376965,0,0,0.76376965,-3408.2907,151.56919)">
            <g
               transform="translate(-24.341666,167.21666)"
               id="g1558-3-4">
              <path
                 id="path1561-9-0-6"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <ellipse
                 cy="1922.459"
                 cx="-1947.2753"
                 id="circle1563-6-9-2"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 rx="43.18829"
                 ry="43.188286" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 id="path1567-8-2-6" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1569-5-5-7"
                 cx="-1895.2457"
                 cy="1830.6296"
                 r="30.513643" />
            </g>
            <g
               transform="translate(-22.931285,302.7813)"
               id="g1562-4-4-5">
              <path
                 id="path866-8-3-0-6"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle868-8-3-5-9"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
            <g
               transform="translate(-22.931285,303.25938)"
               id="g1572-3-9-8">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect927-8-8-4-7"
                 width="106.63572"
                 height="62.98344"
                 x="-2137.0515"
                 y="1716.1927" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 id="rect933-5-6-6-2" />
            </g>
          </g>
          <g
             transform="matrix(0.76376965,0,0,0.76376965,-3395.7665,166.70512)"
             id="g1749-8">
            <g
               id="g1735-2"
               transform="translate(-24.341666,167.21666)">
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 id="path1727-9" />
              <ellipse
                 ry="43.188286"
                 rx="43.18829"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="ellipse1729-9"
                 cx="-1947.2753"
                 cy="1922.459" />
              <path
                 id="path1731-6"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 r="30.513643"
                 cy="1830.6296"
                 cx="-1895.2457"
                 id="circle1733-0"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1741-2"
               transform="translate(-22.931285,302.7813)">
              <path
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 id="path1737-7" />
              <circle
                 r="28.444267"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1739-6"
                 cx="-2206.677"
                 cy="1687.8186" />
            </g>
            <g
               id="g1747-1"
               transform="translate(-22.931285,303.25938)">
              <rect
                 y="1716.1927"
                 x="-2137.0515"
                 height="62.98344"
                 width="106.63572"
                 id="rect1743-3"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 id="path1745-2"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
          </g>
          <g
             id="g1793-1"
             transform="matrix(0.76376965,0,0,0.76376965,-3382.0073,182.05105)">
            <g
               transform="translate(-24.341666,167.21666)"
               id="g1779-5">
              <path
                 id="path1771-9"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <ellipse
                 cy="1922.459"
                 cx="-1947.2753"
                 id="ellipse1773-9"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 rx="43.18829"
                 ry="43.188286" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 id="path1775-1" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1777-4"
                 cx="-1895.2457"
                 cy="1830.6296"
                 r="30.513643" />
            </g>
            <g
               transform="translate(-22.931285,302.7813)"
               id="g1785-9">
              <path
                 id="path1781-1"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85190392;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle1783-0"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
            <g
               transform="translate(-22.931285,303.25938)"
               id="g1791-7">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect1787-5"
                 width="106.63572"
                 height="62.98344"
                 x="-2137.0515"
                 y="1716.1927" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 id="path1789-8" />
            </g>
          </g>
        </g>
        <g
           id="g2942">
          <circle
             r="183.6758"
             cy="1316.9387"
             cx="-4984.4209"
             id="circle2908"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <g
             id="g2906"
             transform="translate(-58.88024,-835.14261)">
            <g
               transform="matrix(0.76452855,0,0,0.76452855,-3447.5599,811.29377)"
               id="g1613-0-1">
              <g
                 id="g1562-48-1"
                 transform="translate(133.35,-15.875)">
                <path
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   id="path866-8-8-0" />
                <circle
                   r="28.444267"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   id="circle868-8-8-3"
                   cx="-2206.677"
                   cy="1687.8186" />
              </g>
              <g
                 id="g1572-9-4"
                 transform="translate(133.35,-15.396914)">
                <rect
                   y="1716.1927"
                   x="-2137.0515"
                   height="62.98344"
                   width="106.63572"
                   id="rect927-8-7-0"
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <path
                   id="rect933-5-7-3"
                   d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              </g>
              <g
                 id="g1568-6-9"
                 transform="translate(379.41249,-15.875)">
                <path
                   id="path1564-4-1"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <circle
                   cy="1687.8186"
                   cx="-2206.677"
                   id="circle1566-3-9"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   r="28.444267" />
              </g>
            </g>
            <g
               id="g2854"
               transform="matrix(0.76452855,0,0,0.76452855,-3434.3299,827.16887)">
              <g
                 transform="translate(133.35,-15.875)"
                 id="g2840">
                <path
                   id="path2836"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <circle
                   cy="1687.8186"
                   cx="-2206.677"
                   id="circle2838"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   r="28.444267" />
              </g>
              <g
                 transform="translate(133.35,-15.396914)"
                 id="g2846">
                <rect
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   id="rect2842"
                   width="106.63572"
                   height="62.98344"
                   x="-2137.0515"
                   y="1716.1927" />
                <path
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                   id="path2844" />
              </g>
              <g
                 transform="translate(379.41249,-15.875)"
                 id="g2852">
                <path
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   id="path2848" />
                <circle
                   r="28.444267"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   id="circle2850"
                   cx="-2206.677"
                   cy="1687.8186" />
              </g>
            </g>
            <g
               transform="matrix(0.76452855,0,0,0.76452855,-3421.6291,844.10231)"
               id="g2874">
              <g
                 id="g2860"
                 transform="translate(133.35,-15.875)">
                <path
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   id="path2856" />
                <circle
                   r="28.444267"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   id="circle2858"
                   cx="-2206.677"
                   cy="1687.8186" />
              </g>
              <g
                 id="g2866"
                 transform="translate(133.35,-15.396914)">
                <rect
                   y="1716.1927"
                   x="-2137.0515"
                   height="62.98344"
                   width="106.63572"
                   id="rect2862"
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <path
                   id="path2864"
                   d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              </g>
              <g
                 id="g2872"
                 transform="translate(379.41249,-15.875)">
                <path
                   id="path2868"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <circle
                   cy="1687.8186"
                   cx="-2206.677"
                   id="circle2870"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   r="28.444267" />
              </g>
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer17">
        <g
           id="g2503">
          <g
             id="g1613-0"
             transform="translate(-3660.0213,-395.64862)">
            <g
               transform="translate(133.35,-15.875)"
               id="g1562-48">
              <path
                 id="path866-8-8"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle868-8-8"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
            <g
               transform="translate(133.35,-15.396914)"
               id="g1572-9">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect927-8-7"
                 width="106.63572"
                 height="62.98344"
                 x="-2137.0515"
                 y="1716.1927" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 id="rect933-5-7" />
            </g>
            <g
               transform="translate(379.41249,-15.875)"
               id="g1568-6">
              <path
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 id="path1564-4" />
              <circle
                 r="28.444267"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1566-3"
                 cx="-2206.677"
                 cy="1687.8186" />
            </g>
          </g>
          <g
             transform="translate(-3643.6235,-377.10639)"
             id="g1725">
            <g
               id="g1711"
               transform="translate(133.35,-15.875)">
              <path
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 id="path1707" />
              <circle
                 r="28.444267"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1709"
                 cx="-2206.677"
                 cy="1687.8186" />
            </g>
            <g
               id="g1717"
               transform="translate(133.35,-15.396914)">
              <rect
                 y="1716.1927"
                 x="-2137.0515"
                 height="62.98344"
                 width="106.63572"
                 id="rect1713"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 id="path1715"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1723"
               transform="translate(379.41249,-15.875)">
              <path
                 id="path1719"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle1721"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
          </g>
        </g>
        <g
           id="g2481">
          <g
             id="g1626-0"
             transform="translate(-3503.74,-344.84862)">
            <g
               transform="translate(-24.341666,167.21666)"
               id="g1558-3">
              <path
                 id="path1561-9-0"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <ellipse
                 cy="1922.459"
                 cx="-1947.2753"
                 id="circle1563-6-9"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 rx="43.18829"
                 ry="43.188286" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 id="path1567-8-2" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1569-5-5"
                 cx="-1895.2457"
                 cy="1830.6296"
                 r="30.513643" />
            </g>
            <g
               transform="translate(-22.931285,302.7813)"
               id="g1562-4-4">
              <path
                 id="path866-8-3-0"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle868-8-3-5"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
            <g
               transform="translate(-22.931285,303.25938)"
               id="g1572-3-9">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect927-8-8-4"
                 width="106.63572"
                 height="62.98344"
                 x="-2137.0515"
                 y="1716.1927" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 id="rect933-5-6-6" />
            </g>
          </g>
          <g
             transform="translate(-3487.3422,-325.03122)"
             id="g1749">
            <g
               id="g1735"
               transform="translate(-24.341666,167.21666)">
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 id="path1727" />
              <ellipse
                 ry="43.188286"
                 rx="43.18829"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="ellipse1729"
                 cx="-1947.2753"
                 cy="1922.459" />
              <path
                 id="path1731"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 r="30.513643"
                 cy="1830.6296"
                 cx="-1895.2457"
                 id="circle1733"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1741"
               transform="translate(-22.931285,302.7813)">
              <path
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 id="path1737" />
              <circle
                 r="28.444267"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1739"
                 cx="-2206.677"
                 cy="1687.8186" />
            </g>
            <g
               id="g1747"
               transform="translate(-22.931285,303.25938)">
              <rect
                 y="1716.1927"
                 x="-2137.0515"
                 height="62.98344"
                 width="106.63572"
                 id="rect1743"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 id="path1745"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
          </g>
          <g
             id="g1793"
             transform="translate(-3487.3422,-325.03122)">
            <g
               transform="translate(-24.341666,167.21666)"
               id="g1779">
              <path
                 id="path1771"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <ellipse
                 cy="1922.459"
                 cx="-1947.2753"
                 id="ellipse1773"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 rx="43.18829"
                 ry="43.188286" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 id="path1775" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1777"
                 cx="-1895.2457"
                 cy="1830.6296"
                 r="30.513643" />
            </g>
            <g
               transform="translate(-22.931285,302.7813)"
               id="g1785">
              <path
                 id="path1781"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle1783"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
            <g
               transform="translate(-22.931285,303.25938)"
               id="g1791">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect1787"
                 width="106.63572"
                 height="62.98344"
                 x="-2137.0515"
                 y="1716.1927" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 id="path1789" />
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         style="display:inline"
         id="layer7">
        <g
           transform="translate(-4224.4714,-380.18555)"
           id="g1613">
          <g
             id="g1562"
             transform="translate(133.35,-15.875)">
            <path
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
               id="path866-8" />
            <circle
               r="28.444267"
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle868-8"
               cx="-2206.677"
               cy="1687.8186" />
          </g>
          <g
             id="g1572"
             transform="translate(133.35,-15.396914)">
            <rect
               y="1716.1927"
               x="-2137.0515"
               height="62.98344"
               width="106.63572"
               id="rect927-8"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="rect933-5"
               d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <g
             id="g1568"
             transform="translate(379.41249,-15.875)">
            <path
               id="path1564"
               d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <circle
               cy="1687.8186"
               cx="-2206.677"
               id="circle1566"
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               r="28.444267" />
          </g>
        </g>
        <g
           transform="translate(-4080.538,-329.38555)"
           id="g1626">
          <g
             id="g1558"
             transform="translate(-24.341666,167.21666)">
            <path
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
               id="path1561-9" />
            <ellipse
               ry="43.188286"
               rx="43.18829"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle1563-6"
               cx="-1947.2753"
               cy="1922.459" />
            <path
               id="path1567-8"
               d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <circle
               r="30.513643"
               cy="1830.6296"
               cx="-1895.2457"
               id="circle1569-5"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <g
             id="g1562-4"
             transform="translate(-22.931285,302.7813)">
            <path
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
               id="path866-8-3" />
            <circle
               r="28.444267"
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle868-8-3"
               cx="-2206.677"
               cy="1687.8186" />
          </g>
          <g
             id="g1572-3"
             transform="translate(-22.931285,303.25938)">
            <rect
               y="1716.1927"
               x="-2137.0515"
               height="62.98344"
               width="106.63572"
               id="rect927-8-8"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="rect933-5-6"
               d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer6">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1279">
          <g
             id="g944"
             transform="translate(-910.16664,-28.574999)">
            <rect
               y="1343.5273"
               x="-1338.2998"
               height="135.789"
               width="225.30016"
               id="rect927"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="rect933"
               d="m -1338.0126,1343.8157 112.3628,74.2523 112.3628,-74.2523 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.57678604;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
        </g>
        <g
           transform="translate(-3426.7328,-490.29627)"
           id="g989">
          <g
             id="g975"
             transform="translate(138.44561,-42.656216)">
            <rect
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.9958334;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect946"
               width="157.7802"
               height="95.094551"
               x="-1901.7225"
               y="1333.1434" />
            <path
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -1901.5215,1333.3454 78.6889,51.9997 78.6889,-51.9997 z"
               id="path949" />
          </g>
          <g
             id="g981"
             transform="translate(262.23411,20.65174)"
             style="opacity:1">
            <rect
               y="1333.1434"
               x="-1901.7225"
               height="95.094551"
               width="157.7802"
               id="rect977"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.9958334;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path979"
               d="m -1901.5215,1333.3454 78.6889,51.9997 78.6889,-51.9997 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer5">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1236">
          <path
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.25721264;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -525.71296,253.62411 h -137.2324 l -47.7512,252.18962 h 232.731 z"
             id="rect870-0-91-4" />
          <circle
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.1027832;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="path905-9-9-8"
             cx="-594.33112"
             cy="173.58479"
             r="66.993996" />
          <g
             id="g1224"
             transform="translate(-7.4083337)">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-9-2"
               cx="-507.78625"
               cy="468.12787"
               r="63.47197" />
            <g
               transform="matrix(0.63641005,0.63641005,-0.61154028,0.61154028,323.9741,469.89481)"
               id="g1085">
              <path
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:28;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2497.9778,2530.0429 h -15.4766 c -14.1588,0 -25.5574,-11.3986 -25.5574,-25.5574 v -99.3937 c 0,-14.1588 11.3986,-25.5574 25.5574,-25.5574 v 0 h 76.7365 c 14.1588,0 25.5574,11.3986 25.5574,25.5574 v 99.3937 c 0,14.1588 -11.3986,25.5574 -25.5574,25.5574 h -15.4747"
                 id="path1077"
                 transform="scale(0.26458333)" />
              <path
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:28;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2452.1926,2599.5996 h 15.4747 c 14.1588,0 25.5574,11.3986 25.5574,25.5574 v 99.3937 c 0,14.1588 -11.3986,25.5574 -25.5574,25.5574 h -76.7365 c -14.1588,0 -25.5574,-11.3986 -25.5574,-25.5574 v -99.3937 c 0,-14.1588 11.3986,-25.5574 25.5574,-25.5574 v 0 h 15.4766"
                 id="path1080"
                 transform="scale(0.26458333)" />
              <rect
                 rx="3.8080657"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:3.78481984;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect944-3"
                 width="7.6161313"
                 height="46.164276"
                 x="-658.67462"
                 y="655.52679"
                 ry="3.8080657" />
            </g>
          </g>
        </g>
        <g
           transform="translate(-3449.1082,-503.76665)"
           id="g1258">
          <g
             style="display:inline;opacity:1"
             id="g1599-3-8-5"
             transform="translate(1485.212,-85.331339)">
            <g
               id="g1565-8-7-6"
               transform="translate(-220.01628,-58.193105)">
              <path
                 id="path1561-0-2-1"
                 d="m -1902.3174,1011.9294 a 118.7378,118.7378 0 0 0 -15.3356,1.1394 l -5.4517,15.3304 a 104.46818,104.46818 0 0 0 -36.8756,15.2323 l -14.7177,-6.9962 a 118.7378,118.7378 0 0 0 -21.6167,21.7239 l 6.9625,14.6474 a 104.46818,104.46818 0 0 0 -15.3525,36.9155 l -15.2323,5.4167 a 118.7378,118.7378 0 0 0 -1.1181,15.3282 118.7378,118.7378 0 0 0 1.1394,15.3359 l 15.3307,5.4517 a 104.46818,104.46818 0 0 0 15.2317,36.875 l -6.9961,14.7179 a 118.7378,118.7378 0 0 0 21.7242,21.6168 l 14.6471,-6.9625 a 104.46818,104.46818 0 0 0 36.9157,15.3525 l 5.4167,15.2323 a 118.7378,118.7378 0 0 0 15.3283,1.1184 118.7378,118.7378 0 0 0 15.3356,-1.1397 l 5.4516,-15.3301 a 104.46818,104.46818 0 0 0 36.8753,-15.2323 l 14.718,6.9961 a 118.7378,118.7378 0 0 0 21.6167,-21.7241 l -6.9625,-14.6472 a 104.46818,104.46818 0 0 0 15.3523,-36.9155 l 15.2326,-5.4169 a 118.7378,118.7378 0 0 0 1.118,-15.3283 118.7378,118.7378 0 0 0 -1.1393,-15.3355 l -15.3307,-5.4517 a 104.46818,104.46818 0 0 0 -15.2321,-36.8751 l 6.9962,-14.7179 a 118.7378,118.7378 0 0 0 -21.7237,-21.617 l -14.6476,6.9628 a 104.46818,104.46818 0 0 0 -36.9155,-15.3526 l -5.4167,-15.2325 a 118.7378,118.7378 0 0 0 -15.3282,-1.1181 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:4.47788286;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 r="100.35399"
                 cy="1130.6672"
                 cx="-1902.3175"
                 id="circle1563-5-8-1"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:5.13744736;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1591-6-2-5">
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.34218502;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2011.2077,787.71913 a 88.623062,88.623062 0 0 0 -11.4461,0.85043 l -4.0691,11.44224 a 77.972558,77.972558 0 0 0 -27.523,11.36903 l -10.985,-5.2218 a 88.623062,88.623062 0 0 0 -16.1342,16.2142 l 5.1967,10.93247 a 77.972558,77.972558 0 0 0 -11.4588,27.55285 l -11.369,4.04289 a 88.623062,88.623062 0 0 0 -0.8345,11.44061 88.623062,88.623062 0 0 0 0.8504,11.44635 l 11.4425,4.06902 a 77.972558,77.972558 0 0 0 11.3686,27.52262 l -5.2218,10.98509 a 88.623062,88.623062 0 0 0 16.2145,16.13426 l 10.9322,-5.19664 a 77.972558,77.972558 0 0 0 27.553,11.45874 l 4.0429,11.36902 a 88.623062,88.623062 0 0 0 11.4407,0.83475 88.623062,88.623062 0 0 0 11.4461,-0.85065 l 4.069,-11.44202 a 77.972558,77.972558 0 0 0 27.5228,-11.36902 l 10.9852,5.22172 a 88.623062,88.623062 0 0 0 16.1342,-16.21435 l -5.1967,-10.93232 a 77.972558,77.972558 0 0 0 11.4586,-27.55285 l 11.3692,-4.04305 a 88.623062,88.623062 0 0 0 0.8345,-11.44067 88.623062,88.623062 0 0 0 -0.8504,-11.44605 l -11.4424,-4.06902 a 77.972558,77.972558 0 0 0 -11.3689,-27.5227 l 5.2218,-10.98509 a 88.623062,88.623062 0 0 0 -16.2141,-16.13441 l -10.9326,5.19687 a 77.972558,77.972558 0 0 0 -27.5528,-11.45882 l -4.0429,-11.36917 a 88.623062,88.623062 0 0 0 -11.4406,-0.83453 z"
                 id="path1567-6-9-9" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.75522709;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1569-4-9-8"
                 cx="-2011.2078"
                 cy="876.34222"
                 r="73.353943" />
            </g>
          </g>
          <g
             id="g1242">
            <g
               id="g1217">
              <circle
                 r="63.47197"
                 cy="1065.9447"
                 cx="-535.2641"
                 id="circle909-9-6-8"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46700001;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <g
                 id="g1085-4"
                 transform="matrix(0.63641005,0.63641005,-0.61154027,0.61154027,296.49624,1067.7116)">
                <path
                   transform="scale(0.26458333)"
                   id="path1077-4"
                   d="m -2497.9778,2530.0429 h -15.4766 c -14.1588,0 -25.5574,-11.3986 -25.5574,-25.5574 v -99.3937 c 0,-14.1588 11.3986,-25.5574 25.5574,-25.5574 v 0 h 76.7365 c 14.1588,0 25.5574,11.3986 25.5574,25.5574 v 99.3937 c 0,14.1588 -11.3986,25.5574 -25.5574,25.5574 h -15.4747"
                   style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:28;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <path
                   transform="scale(0.26458333)"
                   id="path1080-4"
                   d="m -2452.1926,2599.5996 h 15.4747 c 14.1588,0 25.5574,11.3986 25.5574,25.5574 v 99.3937 c 0,14.1588 -11.3986,25.5574 -25.5574,25.5574 h -76.7365 c -14.1588,0 -25.5574,-11.3986 -25.5574,-25.5574 v -99.3937 c 0,-14.1588 11.3986,-25.5574 25.5574,-25.5574 v 0 h 15.4766"
                   style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:28;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <rect
                   rx="3.8080657"
                   ry="3.8080657"
                   y="655.52679"
                   x="-658.67462"
                   height="46.164276"
                   width="7.6161313"
                   id="rect944-3-7"
                   style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:3.78481984;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              </g>
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         id="layer2">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1142">
          <path
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.25721264;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1068.5845,274.09045 h -137.2324 l -47.7512,252.18962 h 232.731 z"
             id="rect870-0-91" />
          <circle
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.1027832;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="path905-9-9"
             cx="-1137.2026"
             cy="194.05113"
             r="66.993996" />
          <g
             id="g1116">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-9"
               cx="-1058.0662"
               cy="488.59421"
               r="63.47197" />
            <g
               transform="matrix(0.99747158,0,0,1.0000051,-569.07842,-456.7783)"
               id="g1292">
              <path
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -470.11869,913.62885 a 41.976201,37.842234 0 0 1 21.5246,33.04689 v 0 a 41.976201,37.842234 0 0 1 -21.5087,33.03885"
                 id="path1018" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="path1020"
                 d="m -774.89979,793.71478 -94.99016,164.52778 -94.99016,-164.52778 z"
                 transform="matrix(0.20172907,0,0,0.18216379,-303.18889,753.04177)" />
              <path
                 id="path1040"
                 d="m -510.55801,977.35622 a 41.976201,37.842234 0 0 1 -21.52462,-33.04686 v 0 a 41.976201,37.842234 0 0 1 21.50872,-33.03887"
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 d="m 1113.3891,-1384.702 -94.9901,164.5278 -94.99017,-164.5278 z"
                 id="path1042"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 transform="matrix(-0.20175844,0,0,-0.18188853,-296.58256,741.24642)" />
            </g>
          </g>
        </g>
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1838">
          <g
             style="display:inline;opacity:1"
             id="g1599-3-8"
             transform="translate(935.93702,-79.993583)">
            <g
               id="g1565-8-7"
               transform="translate(-220.01628,-58.193105)">
              <path
                 id="path1561-0-2"
                 d="m -1902.3174,1011.9294 a 118.7378,118.7378 0 0 0 -15.3356,1.1394 l -5.4517,15.3304 a 104.46818,104.46818 0 0 0 -36.8756,15.2323 l -14.7177,-6.9962 a 118.7378,118.7378 0 0 0 -21.6167,21.7239 l 6.9625,14.6474 a 104.46818,104.46818 0 0 0 -15.3525,36.9155 l -15.2323,5.4167 a 118.7378,118.7378 0 0 0 -1.1181,15.3282 118.7378,118.7378 0 0 0 1.1394,15.3359 l 15.3307,5.4517 a 104.46818,104.46818 0 0 0 15.2317,36.875 l -6.9961,14.7179 a 118.7378,118.7378 0 0 0 21.7242,21.6168 l 14.6471,-6.9625 a 104.46818,104.46818 0 0 0 36.9157,15.3525 l 5.4167,15.2323 a 118.7378,118.7378 0 0 0 15.3283,1.1184 118.7378,118.7378 0 0 0 15.3356,-1.1397 l 5.4516,-15.3301 a 104.46818,104.46818 0 0 0 36.8753,-15.2323 l 14.718,6.9961 a 118.7378,118.7378 0 0 0 21.6167,-21.7241 l -6.9625,-14.6472 a 104.46818,104.46818 0 0 0 15.3523,-36.9155 l 15.2326,-5.4169 a 118.7378,118.7378 0 0 0 1.118,-15.3283 118.7378,118.7378 0 0 0 -1.1393,-15.3355 l -15.3307,-5.4517 a 104.46818,104.46818 0 0 0 -15.2321,-36.8751 l 6.9962,-14.7179 a 118.7378,118.7378 0 0 0 -21.7237,-21.617 l -14.6476,6.9628 a 104.46818,104.46818 0 0 0 -36.9155,-15.3526 l -5.4167,-15.2325 a 118.7378,118.7378 0 0 0 -15.3282,-1.1181 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:4.47788286;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 r="100.35399"
                 cy="1130.6672"
                 cx="-1902.3175"
                 id="circle1563-5-8"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:5.13744736;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1591-6-2">
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.34218502;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2011.2077,787.71913 a 88.623062,88.623062 0 0 0 -11.4461,0.85043 l -4.0691,11.44224 a 77.972558,77.972558 0 0 0 -27.523,11.36903 l -10.985,-5.2218 a 88.623062,88.623062 0 0 0 -16.1342,16.2142 l 5.1967,10.93247 a 77.972558,77.972558 0 0 0 -11.4588,27.55285 l -11.369,4.04289 a 88.623062,88.623062 0 0 0 -0.8345,11.44061 88.623062,88.623062 0 0 0 0.8504,11.44635 l 11.4425,4.06902 a 77.972558,77.972558 0 0 0 11.3686,27.52262 l -5.2218,10.98509 a 88.623062,88.623062 0 0 0 16.2145,16.13426 l 10.9322,-5.19664 a 77.972558,77.972558 0 0 0 27.553,11.45874 l 4.0429,11.36902 a 88.623062,88.623062 0 0 0 11.4407,0.83475 88.623062,88.623062 0 0 0 11.4461,-0.85065 l 4.069,-11.44202 a 77.972558,77.972558 0 0 0 27.5228,-11.36902 l 10.9852,5.22172 a 88.623062,88.623062 0 0 0 16.1342,-16.21435 l -5.1967,-10.93232 a 77.972558,77.972558 0 0 0 11.4586,-27.55285 l 11.3692,-4.04305 a 88.623062,88.623062 0 0 0 0.8345,-11.44067 88.623062,88.623062 0 0 0 -0.8504,-11.44605 l -11.4424,-4.06902 a 77.972558,77.972558 0 0 0 -11.3689,-27.5227 l 5.2218,-10.98509 a 88.623062,88.623062 0 0 0 -16.2141,-16.13441 l -10.9326,5.19687 a 77.972558,77.972558 0 0 0 -27.5528,-11.45882 l -4.0429,-11.36917 a 88.623062,88.623062 0 0 0 -11.4406,-0.83453 z"
                 id="path1567-6-9" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.75522709;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1569-4-9"
                 cx="-2011.2078"
                 cy="876.34222"
                 r="73.353943" />
            </g>
          </g>
          <g
             id="g1302-7"
             transform="translate(-1021.7847,465.19302)">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-9-6"
               cx="-62.754391"
               cy="606.08948"
               r="63.47197" />
            <g
               transform="translate(427.58397,-339.27822)"
               id="g1292-1">
              <path
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -470.11869,913.62885 a 41.976201,37.842234 0 0 1 21.5246,33.04689 v 0 a 41.976201,37.842234 0 0 1 -21.5087,33.03885"
                 id="path1018-3" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="path1020-2"
                 d="m -774.89979,793.71478 -94.99016,164.52778 -94.99016,-164.52778 z"
                 transform="matrix(0.20172907,0,0,0.18216379,-303.18889,753.04177)" />
              <path
                 id="path1040-1"
                 d="m -510.55801,977.35622 a 41.976201,37.842234 0 0 1 -21.52462,-33.04686 v 0 a 41.976201,37.842234 0 0 1 21.50872,-33.03887"
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 d="m 1113.3891,-1384.702 -94.9901,164.5278 -94.99017,-164.5278 z"
                 id="path1042-5"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 transform="matrix(-0.20175844,0,0,-0.18188853,-296.58256,741.24642)" />
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         style="display:inline"
         id="layer1">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g2297">
          <path
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.25721264;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1513.8351,274.09044 h -137.2324 l -47.7512,252.18963 h 232.731 z"
             id="rect870-0" />
          <circle
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.1027832;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="path905-9"
             cx="-1582.4532"
             cy="194.05113"
             r="66.993996" />
          <g
             id="g1235"
             transform="translate(-1065.5743,-371.69312)">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909"
               cx="-437.74243"
               cy="860.28735"
               r="63.47197" />
            <path
               d="m -392.53712,856.72405 -0.0388,7.58774 -90.37182,-0.46108 0.0388,-7.58775 z m -48.99918,-41.62316 7.58784,-7e-5 2e-5,90.373 -7.58786,6e-5 z"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.32291663;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect926" />
          </g>
        </g>
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1850">
          <g
             style="display:inline;opacity:1"
             id="g1599-3"
             transform="translate(490.37869,-79.97445)">
            <g
               id="g1565-8"
               transform="translate(-220.01628,-58.193105)">
              <path
                 id="path1561-0"
                 d="m -1902.3174,1011.9294 a 118.7378,118.7378 0 0 0 -15.3356,1.1394 l -5.4517,15.3304 a 104.46818,104.46818 0 0 0 -36.8756,15.2323 l -14.7177,-6.9962 a 118.7378,118.7378 0 0 0 -21.6167,21.7239 l 6.9625,14.6474 a 104.46818,104.46818 0 0 0 -15.3525,36.9155 l -15.2323,5.4167 a 118.7378,118.7378 0 0 0 -1.1181,15.3282 118.7378,118.7378 0 0 0 1.1394,15.3359 l 15.3307,5.4517 a 104.46818,104.46818 0 0 0 15.2317,36.875 l -6.9961,14.7179 a 118.7378,118.7378 0 0 0 21.7242,21.6168 l 14.6471,-6.9625 a 104.46818,104.46818 0 0 0 36.9157,15.3525 l 5.4167,15.2323 a 118.7378,118.7378 0 0 0 15.3283,1.1184 118.7378,118.7378 0 0 0 15.3356,-1.1397 l 5.4516,-15.3301 a 104.46818,104.46818 0 0 0 36.8753,-15.2323 l 14.718,6.9961 a 118.7378,118.7378 0 0 0 21.6167,-21.7241 l -6.9625,-14.6472 a 104.46818,104.46818 0 0 0 15.3523,-36.9155 l 15.2326,-5.4169 a 118.7378,118.7378 0 0 0 1.118,-15.3283 118.7378,118.7378 0 0 0 -1.1393,-15.3355 l -15.3307,-5.4517 a 104.46818,104.46818 0 0 0 -15.2321,-36.8751 l 6.9962,-14.7179 a 118.7378,118.7378 0 0 0 -21.7237,-21.617 l -14.6476,6.9628 a 104.46818,104.46818 0 0 0 -36.9155,-15.3526 l -5.4167,-15.2325 a 118.7378,118.7378 0 0 0 -15.3282,-1.1181 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:4.47788286;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 r="100.35399"
                 cy="1130.6672"
                 cx="-1902.3175"
                 id="circle1563-5"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:5.13744736;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1591-6">
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.34218502;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2011.2077,787.71913 a 88.623062,88.623062 0 0 0 -11.4461,0.85043 l -4.0691,11.44224 a 77.972558,77.972558 0 0 0 -27.523,11.36903 l -10.985,-5.2218 a 88.623062,88.623062 0 0 0 -16.1342,16.2142 l 5.1967,10.93247 a 77.972558,77.972558 0 0 0 -11.4588,27.55285 l -11.369,4.04289 a 88.623062,88.623062 0 0 0 -0.8345,11.44061 88.623062,88.623062 0 0 0 0.8504,11.44635 l 11.4425,4.06902 a 77.972558,77.972558 0 0 0 11.3686,27.52262 l -5.2218,10.98509 a 88.623062,88.623062 0 0 0 16.2145,16.13426 l 10.9322,-5.19664 a 77.972558,77.972558 0 0 0 27.553,11.45874 l 4.0429,11.36902 a 88.623062,88.623062 0 0 0 11.4407,0.83475 88.623062,88.623062 0 0 0 11.4461,-0.85065 l 4.069,-11.44202 a 77.972558,77.972558 0 0 0 27.5228,-11.36902 l 10.9852,5.22172 a 88.623062,88.623062 0 0 0 16.1342,-16.21435 l -5.1967,-10.93232 a 77.972558,77.972558 0 0 0 11.4586,-27.55285 l 11.3692,-4.04305 a 88.623062,88.623062 0 0 0 0.8345,-11.44067 88.623062,88.623062 0 0 0 -0.8504,-11.44605 l -11.4424,-4.06902 a 77.972558,77.972558 0 0 0 -11.3689,-27.5227 l 5.2218,-10.98509 a 88.623062,88.623062 0 0 0 -16.2141,-16.13441 l -10.9326,5.19687 a 77.972558,77.972558 0 0 0 -27.5528,-11.45882 l -4.0429,-11.36917 a 88.623062,88.623062 0 0 0 -11.4406,-0.83453 z"
                 id="path1567-6" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.75522709;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1569-4"
                 cx="-2011.2078"
                 cy="876.34222"
                 r="73.353943" />
            </g>
          </g>
          <g
             style="display:inline"
             id="g1235-0"
             transform="translate(-1092.4031,210.92211)">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-4"
               cx="-437.74243"
               cy="860.28735"
               r="63.47197" />
            <path
               d="m -392.53712,856.72405 -0.0388,7.58774 -90.37182,-0.46108 0.0388,-7.58775 z m -48.99918,-41.62316 7.58784,-7e-5 2e-5,90.373 -7.58786,6e-5 z"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.32291663;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect926-6" />
          </g>
        </g>
      </g>
      <g
         transform="translate(5609.2501,380.76095)"
         style="display:inline;opacity:1"
         id="layer3">
        <g
           transform="translate(-4437.0116,-609.74064)"
           id="g1324">
          <path
             id="path866"
             d="m -983.12639,380.06443 h -137.23251 l -47.7511,252.18963 h 232.73102 z"
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.25711632;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <circle
             cy="300.02512"
             cx="-1051.7445"
             id="circle868"
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             r="66.993996" />
        </g>
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1131">
          <path
             id="path1561"
             d="m -2123.392,873.76185 a 118.7378,118.7378 0 0 0 -15.3356,1.1394 l -5.4517,15.3304 a 104.46818,104.46818 0 0 0 -36.8756,15.2323 l -14.7177,-6.9962 a 118.7378,118.7378 0 0 0 -21.6167,21.7239 l 6.9625,14.6474 a 104.46818,104.46818 0 0 0 -15.3525,36.9155 l -15.2323,5.4167 a 118.7378,118.7378 0 0 0 -1.1181,15.3282 118.7378,118.7378 0 0 0 1.1394,15.33585 l 15.3307,5.4518 a 104.46818,104.46818 0 0 0 15.2317,36.875 l -6.9961,14.7179 a 118.7378,118.7378 0 0 0 21.7242,21.6168 l 14.6471,-6.9625 a 104.46818,104.46818 0 0 0 36.9157,15.3525 l 5.4167,15.2322 a 118.7378,118.7378 0 0 0 15.3283,1.1185 118.7378,118.7378 0 0 0 15.3356,-1.1397 l 5.4516,-15.3301 a 104.46818,104.46818 0 0 0 36.8753,-15.2323 l 14.718,6.9961 a 118.7378,118.7378 0 0 0 21.6167,-21.7241 l -6.9625,-14.6472 a 104.46818,104.46818 0 0 0 15.3523,-36.9155 l 15.2326,-5.4169 a 118.7378,118.7378 0 0 0 1.118,-15.32835 118.7378,118.7378 0 0 0 -1.1393,-15.3355 l -15.3307,-5.4517 a 104.46818,104.46818 0 0 0 -15.2321,-36.8751 l 6.9962,-14.7179 a 118.7378,118.7378 0 0 0 -21.7237,-21.617 l -14.6476,6.9628 a 104.46818,104.46818 0 0 0 -36.9155,-15.3526 l -5.4167,-15.2325 a 118.7378,118.7378 0 0 0 -15.3282,-1.1181 z"
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:4.47788286;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <circle
             r="100.35399"
             cy="992.49969"
             cx="-2123.3921"
             id="circle1563"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:5.13744736;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.34218502;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -2012.266,707.74468 a 88.623062,88.623062 0 0 0 -11.4461,0.85043 l -4.0691,11.44224 a 77.972558,77.972558 0 0 0 -27.523,11.36903 l -10.985,-5.2218 a 88.623062,88.623062 0 0 0 -16.1342,16.2142 l 5.1967,10.93247 a 77.972558,77.972558 0 0 0 -11.4588,27.55285 l -11.369,4.04289 a 88.623062,88.623062 0 0 0 -0.8345,11.44061 88.623062,88.623062 0 0 0 0.8504,11.44635 l 11.4425,4.06902 a 77.972558,77.972558 0 0 0 11.3686,27.52262 l -5.2218,10.98509 a 88.623062,88.623062 0 0 0 16.2145,16.13426 l 10.9322,-5.19664 a 77.972558,77.972558 0 0 0 27.553,11.45874 l 4.0429,11.36902 a 88.623062,88.623062 0 0 0 11.4407,0.83475 88.623062,88.623062 0 0 0 11.4461,-0.85065 l 4.069,-11.44202 a 77.972558,77.972558 0 0 0 27.5228,-11.36902 l 10.9852,5.22172 a 88.623062,88.623062 0 0 0 16.1342,-16.21435 l -5.1967,-10.93232 a 77.972558,77.972558 0 0 0 11.4586,-27.55285 l 11.3692,-4.04305 a 88.623062,88.623062 0 0 0 0.8345,-11.44067 88.623062,88.623062 0 0 0 -0.8504,-11.44605 l -11.4424,-4.06902 a 77.972558,77.972558 0 0 0 -11.3689,-27.5227 l 5.2218,-10.98509 a 88.623062,88.623062 0 0 0 -16.2141,-16.13441 l -10.9326,5.19687 a 77.972558,77.972558 0 0 0 -27.5528,-11.45882 l -4.0429,-11.36917 a 88.623062,88.623062 0 0 0 -11.4406,-0.83453 z"
             id="path1567" />
          <circle
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.75522709;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="circle1569"
             cx="-2012.2661"
             cy="796.3678"
             r="73.353943" />
        </g>
      </g>
    </svg>
  `;

    return `${SVG_PREFIX}${encodeURIComponent(template)}`;
  }

  private machineSubjectIcon() {
    const template = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg
       xmlns:dc="http://purl.org/dc/elements/1.1/"
       xmlns:cc="http://creativecommons.org/ns#"
       xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:svg="http://www.w3.org/2000/svg"
       xmlns="http://www.w3.org/2000/svg"
       id="svg8"
       version="1.1"
       viewBox="0 0 322.39676 407.40298"
       height="407.40298mm"
       width="322.39676mm">
      <defs
         id="defs2" />
      <metadata
         id="metadata5">
        <rdf:RDF>
          <cc:Work
             rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
               rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <g
         transform="translate(5686.0686,-202.30687)"
         style="display:none"
         id="layer4">
        <g
           id="g1165">
          <g
             id="g1153">
            <path
               transform="rotate(35.083071,-289.44291,873.6563)"
               d="m -148.59267,988.11018 -208.70242,0 104.35121,-180.7416 z"
               id="path948"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path956"
               d="m -324.72806,987.85034 c -108.59128,142.37276 -110.57551,280.70856 59.83623,412.51626"
               style="fill:none;stroke:#b3b3b3;stroke-width:26.45833397;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <g
             id="g1157">
            <path
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="path974"
               d="m -148.59267,988.11018 -208.70242,0 104.35121,-180.7416 z"
               transform="rotate(-144.91693,-83.010974,1079.6561)" />
            <path
               style="fill:none;stroke:#b3b3b3;stroke-width:26.45833397;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="M 2.8002975,1252.6853 C 111.39157,1110.3126 113.3758,971.97675 -57.035941,840.16903"
               id="path976" />
          </g>
        </g>
        <path
           style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.62115765;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="m -1262.1599,130.91712 a 35.901127,42.182886 0 0 0 35.2944,41.31194 v 0.0279 h 0.4752 a 35.901127,42.182886 0 0 0 0.095,0.006 35.901127,42.182886 0 0 0 0.1345,-0.006 h 210.4447 v -41.3398 z"
           id="path1154" />
        <path
           id="path1216"
           d="m -953.63935,-206.90666 a 28.25238,42.172221 0 0 0 -2.82051,0.21309 28.25238,42.172221 0 0 0 -2.7917,0.63185 28.25238,42.172221 0 0 0 -2.7363,1.04503 28.25238,42.172221 0 0 0 -2.65199,1.44768 28.25238,42.172221 0 0 0 -2.54209,1.83548 28.25238,42.172221 0 0 0 -2.40732,2.20528 28.25238,42.172221 0 0 0 -2.2475,2.5528 28.25238,42.172221 0 0 0 -2.06528,2.87492 28.25238,42.172221 0 0 0 -1.86272,3.16855 28.25238,42.172221 0 0 0 -1.64129,3.42996 28.25238,42.172221 0 0 0 -1.4038,3.6573 28.25238,42.172221 0 0 0 -1.15221,3.84872 28.25238,42.172221 0 0 0 -0.889,4.00111 28.25238,42.172221 0 0 0 -0.61759,4.11385 28.25238,42.172221 0 0 0 -0.3388,4.18508 28.25238,42.172221 0 0 0 -0.064,2.12414 h 42.82419 v -35.2381 a 28.25238,42.172221 0 0 0 -2.30198,-1.8813 28.25238,42.172221 0 0 0 -2.59983,-1.6453 28.25238,42.172221 0 0 0 -2.69719,-1.24945 28.25238,42.172221 0 0 0 -2.76719,-0.84123 28.25238,42.172221 0 0 0 -2.8098,-0.42495 28.25238,42.172221 0 0 0 -1.4161,-0.0546 z"
           style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1156"
           d="m -1166.1606,-206.91286 a 38.720117,42.182886 0 0 0 -0.1042,0.006 h -0.5123 v 0.0278 a 38.720117,42.182886 0 0 0 -38.0657,41.31192 h 265.79503 v -0.005 h -42.82429 a 28.25238,42.172221 0 0 1 0.064,-2.12413 28.25238,42.172221 0 0 1 0.3387,-4.18509 28.25238,42.172221 0 0 1 0.61761,-4.11384 28.25238,42.172221 0 0 1 0.889,-4.00111 28.25238,42.172221 0 0 1 1.15218,-3.84872 28.25238,42.172221 0 0 1 1.40383,-3.6573 28.25238,42.172221 0 0 1 1.64129,-3.42997 28.25238,42.172221 0 0 1 1.8628,-3.16855 28.25238,42.172221 0 0 1 2.06531,-2.87492 28.25238,42.172221 0 0 1 2.24748,-2.55279 28.25238,42.172221 0 0 1 2.40731,-2.20529 28.25238,42.172221 0 0 1 2.54201,-1.83547 28.25238,42.172221 0 0 1 2.65208,-1.44769 28.25238,42.172221 0 0 1 2.73621,-1.04503 28.25238,42.172221 0 0 1 2.7917,-0.63185 28.25238,42.172221 0 0 1 2.82048,-0.21309 h -212.37623 a 38.720117,42.182886 0 0 0 -0.1449,-0.006 z"
           style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1205"
           d="m -953.63917,-206.90665 a 28.25238,42.172221 0 0 0 -28.23239,41.33493 h 56.4565 a 28.25238,42.172221 0 0 0 -28.22411,-41.33493 z"
           style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:8.53386688;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           id="path1158"
           d="m -981.87156,-165.56649 h -222.92564 v 296.4838 h 152.6335 a 35.176352,42.182886 0 0 0 35.151,41.3454 35.176352,42.182886 0 0 0 35.14114,-41.3454 z"
           style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:9.52354527;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <g
           transform="translate(1905.0674,-65.89314)"
           id="g1280">
          <path
             id="path1220"
             d="m -2241.8133,-134.30036 a 28.25238,42.17222 0 0 0 -2.8205,0.21309 28.25238,42.17222 0 0 0 -2.7917,0.63185 28.25238,42.17222 0 0 0 -2.7363,1.04503 28.25238,42.17222 0 0 0 -2.652,1.44768 28.25238,42.17222 0 0 0 -2.5421,1.83548 28.25238,42.17222 0 0 0 -2.4073,2.20528 28.25238,42.17222 0 0 0 -2.2475,2.5528 28.25238,42.17222 0 0 0 -2.0653,2.87492 28.25238,42.17222 0 0 0 -1.8627,3.16855 28.25238,42.17222 0 0 0 -1.6413,3.42996 28.25238,42.17222 0 0 0 -1.4038,3.6573 28.25238,42.17222 0 0 0 -1.1522,3.84872 28.25238,42.17222 0 0 0 -0.889,4.00111 28.25238,42.17222 0 0 0 -0.6176,4.113849 28.25238,42.17222 0 0 0 -0.3388,4.185088 28.25238,42.17222 0 0 0 -0.064,2.124133 h 42.8242 v -35.2381 a 28.25238,42.17222 0 0 0 -2.302,-1.8813 28.25238,42.17222 0 0 0 -2.5998,-1.6453 28.25238,42.17222 0 0 0 -2.6972,-1.24945 28.25238,42.17222 0 0 0 -2.7672,-0.84123 28.25238,42.17222 0 0 0 -2.8098,-0.42495 28.25238,42.17222 0 0 0 -1.4161,-0.0546 z"
             style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1222"
             d="m -2454.3345,-134.30656 a 38.720119,42.182887 0 0 0 -0.1043,0.006 h -0.5122 v 0.0278 a 38.720119,42.182887 0 0 0 -38.0658,41.311924 h 265.7951 v -0.0049 h -42.8243 a 28.25238,42.17222 0 0 1 0.064,-2.124134 28.25238,42.17222 0 0 1 0.3387,-4.185088 28.25238,42.17222 0 0 1 0.6176,-4.113842 28.25238,42.17222 0 0 1 0.889,-4.00111 28.25238,42.17222 0 0 1 1.1522,-3.84872 28.25238,42.17222 0 0 1 1.4038,-3.6573 28.25238,42.17222 0 0 1 1.6413,-3.42997 28.25238,42.17222 0 0 1 1.8628,-3.16855 28.25238,42.17222 0 0 1 2.0653,-2.87492 28.25238,42.17222 0 0 1 2.2475,-2.55279 28.25238,42.17222 0 0 1 2.4073,-2.20529 28.25238,42.17222 0 0 1 2.542,-1.83547 28.25238,42.17222 0 0 1 2.6521,-1.44769 28.25238,42.17222 0 0 1 2.7362,-1.04503 28.25238,42.17222 0 0 1 2.7917,-0.63185 28.25238,42.17222 0 0 1 2.8205,-0.21309 h -212.3763 a 38.720119,42.182887 0 0 0 -0.1449,-0.006 z"
             style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1224"
             d="m -2241.8131,-134.30035 a 28.25238,42.172222 0 0 0 -28.2324,41.334938 h 56.4565 a 28.25238,42.172222 0 0 0 -28.2241,-41.334938 z"
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:8.53386784;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1226"
             d="m -2270.0455,-92.960186 h -222.9257 V 203.52362 h 152.6335 a 35.176352,42.182887 0 0 0 35.151,41.34539 35.176352,42.182887 0 0 0 35.1412,-41.34539 z"
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:9.52354622;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <g
             id="g1237"
             transform="rotate(180,-2123.161,62.016634)">
            <path
               id="path1228"
               d="m -2004.5544,-120.82988 a 28.25238,42.17222 0 0 1 2.8205,0.21309 28.25238,42.17222 0 0 1 2.7917,0.63185 28.25238,42.17222 0 0 1 2.7363,1.04503 28.25238,42.17222 0 0 1 2.652,1.44768 28.25238,42.17222 0 0 1 2.5421,1.83548 28.25238,42.17222 0 0 1 2.4073,2.20528 28.25238,42.17222 0 0 1 2.2475,2.5528 28.25238,42.17222 0 0 1 2.0653,2.87492 28.25238,42.17222 0 0 1 1.8627,3.16855 28.25238,42.17222 0 0 1 1.6413,3.42996 28.25238,42.17222 0 0 1 1.4038,3.657308 28.25238,42.17222 0 0 1 1.1522,3.84872 28.25238,42.17222 0 0 1 0.889,4.00111 28.25238,42.17222 0 0 1 0.6176,4.11384 28.25238,42.17222 0 0 1 0.3388,4.18509 28.25238,42.17222 0 0 1 0.064,2.12414 h -42.8242 v -35.238108 a 28.25238,42.17222 0 0 1 2.302,-1.8813 28.25238,42.17222 0 0 1 2.5998,-1.6453 28.25238,42.17222 0 0 1 2.6972,-1.24945 28.25238,42.17222 0 0 1 2.7672,-0.84123 28.25238,42.17222 0 0 1 2.8098,-0.42495 28.25238,42.17222 0 0 1 1.4161,-0.0546 z"
               style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1230"
               d="m -1792.0332,-120.83608 a 38.720119,42.182887 0 0 1 0.1043,0.006 h 0.5122 v 0.0278 a 38.720119,42.182887 0 0 1 38.0658,41.311928 h -265.7951 v -0.005 h 42.8243 a 28.25238,42.17222 0 0 0 -0.064,-2.12413 28.25238,42.17222 0 0 0 -0.3387,-4.18509 28.25238,42.17222 0 0 0 -0.6176,-4.11384 28.25238,42.17222 0 0 0 -0.889,-4.00111 28.25238,42.17222 0 0 0 -1.1522,-3.84872 28.25238,42.17222 0 0 0 -1.4038,-3.657308 28.25238,42.17222 0 0 0 -1.6413,-3.42997 28.25238,42.17222 0 0 0 -1.8628,-3.16855 28.25238,42.17222 0 0 0 -2.0653,-2.87492 28.25238,42.17222 0 0 0 -2.2475,-2.55279 28.25238,42.17222 0 0 0 -2.4073,-2.20529 28.25238,42.17222 0 0 0 -2.542,-1.83547 28.25238,42.17222 0 0 0 -2.6521,-1.44769 28.25238,42.17222 0 0 0 -2.7362,-1.04503 28.25238,42.17222 0 0 0 -2.7917,-0.63185 28.25238,42.17222 0 0 0 -2.8205,-0.21309 h 212.3763 a 38.720119,42.182887 0 0 1 0.1449,-0.006 z"
               style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1232"
               d="m -2004.5546,-120.82987 a 28.25238,42.172222 0 0 1 28.2324,41.334938 h -56.4565 a 28.25238,42.172222 0 0 1 28.2241,-41.334938 z"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:8.53386784;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
        </g>
        <g
           transform="matrix(0.99999999,0,0,-0.99999999,1761.1341,73.57649)"
           id="g1270">
          <path
             style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.62115765;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1826.319,224.32694 a 35.901128,42.182887 0 0 0 35.2944,41.31192 v 0.0279 h 0.4753 a 35.901128,42.182887 0 0 0 0.095,0.006 35.901128,42.182887 0 0 0 0.1345,-0.006 h 210.4446 v -41.3398 z"
             id="path1255" />
          <path
             id="path1257"
             d="m -1517.7984,-113.49685 a 28.25238,42.17222 0 0 0 -2.8205,0.21309 28.25238,42.17222 0 0 0 -2.7917,0.63185 28.25238,42.17222 0 0 0 -2.7363,1.04503 28.25238,42.17222 0 0 0 -2.652,1.44768 28.25238,42.17222 0 0 0 -2.5421,1.83548 28.25238,42.17222 0 0 0 -2.4073,2.20528 28.25238,42.17222 0 0 0 -2.2475,2.5528 28.25238,42.17222 0 0 0 -2.0653,2.87492 28.25238,42.17222 0 0 0 -1.8627,3.168546 28.25238,42.17222 0 0 0 -1.6413,3.42996 28.25238,42.17222 0 0 0 -1.4038,3.6573 28.25238,42.17222 0 0 0 -1.1522,3.84872 28.25238,42.17222 0 0 0 -0.889,4.001107 28.25238,42.17222 0 0 0 -0.6176,4.113849 28.25238,42.17222 0 0 0 -0.3388,4.185088 28.25238,42.17222 0 0 0 -0.064,2.124133 h 42.8242 v -35.238093 a 28.25238,42.17222 0 0 0 -2.302,-1.8813 28.25238,42.17222 0 0 0 -2.5998,-1.6453 28.25238,42.17222 0 0 0 -2.6972,-1.24945 28.25238,42.17222 0 0 0 -2.7672,-0.84123 28.25238,42.17222 0 0 0 -2.8098,-0.42495 28.25238,42.17222 0 0 0 -1.4161,-0.0546 z"
             style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1259"
             d="m -1730.3196,-113.50305 a 38.720119,42.182887 0 0 0 -0.1043,0.006 h -0.5122 v 0.0278 a 38.720119,42.182887 0 0 0 -38.0658,41.311917 h 265.7951 v -0.0049 h -42.8243 a 28.25238,42.17222 0 0 1 0.064,-2.124134 28.25238,42.17222 0 0 1 0.3387,-4.185088 28.25238,42.17222 0 0 1 0.6176,-4.113844 28.25238,42.17222 0 0 1 0.889,-4.001105 28.25238,42.17222 0 0 1 1.1522,-3.84872 28.25238,42.17222 0 0 1 1.4038,-3.6573 28.25238,42.17222 0 0 1 1.6413,-3.42997 28.25238,42.17222 0 0 1 1.8628,-3.168546 28.25238,42.17222 0 0 1 2.0653,-2.87492 28.25238,42.17222 0 0 1 2.2475,-2.55279 28.25238,42.17222 0 0 1 2.4073,-2.20529 28.25238,42.17222 0 0 1 2.542,-1.83547 28.25238,42.17222 0 0 1 2.6521,-1.44769 28.25238,42.17222 0 0 1 2.7362,-1.04503 28.25238,42.17222 0 0 1 2.7917,-0.63185 28.25238,42.17222 0 0 1 2.8205,-0.21309 h -212.3763 a 38.720119,42.182887 0 0 0 -0.1449,-0.006 z"
             style="opacity:1;fill:#808080;fill-opacity:1;stroke:none;stroke-width:9.99175072;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1261"
             d="m -1517.7982,-113.49684 a 28.25238,42.172222 0 0 0 -28.2324,41.334931 h 56.4565 a 28.25238,42.172222 0 0 0 -28.2241,-41.334931 z"
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:8.53386784;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1263"
             d="m -1546.0306,-72.156683 h -222.9257 V 224.32713 h 152.6335 a 35.176352,42.182887 0 0 0 35.151,41.34539 35.176352,42.182887 0 0 0 35.1412,-41.34539 z"
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:9.52354622;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer15">
        <g
           transform="translate(-11.910411,-17.946055)"
           id="g1222">
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:10;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1200"
             width="272.65573"
             height="266.18573"
             x="-2857.7981"
             y="-1520.1621"
             ry="0"
             transform="rotate(-45)" />
          <g
             id="g1216"
             transform="translate(-0.00454883,-4.4980133)">
            <rect
               y="861.14423"
               x="-2915.9172"
               height="122.95383"
               width="21.491327"
               id="rect1204"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <rect
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.93906879;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect1206"
               width="22.077242"
               height="22.077242"
               x="-2916.2102"
               y="1013.1955" />
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer16">
        <g
           id="g1408">
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1253"
             width="116.91481"
             height="110.76139"
             x="-3577.002"
             y="1302.7863" />
          <rect
             y="1540.7631"
             x="-3577.002"
             height="110.76139"
             width="116.91481"
             id="rect1255"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1257"
             width="116.91481"
             height="110.76139"
             x="-3830.8301"
             y="1540.7631" />
          <rect
             y="1540.7631"
             x="-3320.1946"
             height="110.76139"
             width="116.91481"
             id="rect1259"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1736-0"
             d="m -3810.327,1592.6126 26.5345,26.5344 49.3741,-49.3741"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3556.4989,1592.6126 26.5345,26.5344 49.3741,-49.3741"
             id="path1284" />
          <g
             id="g1312"
             transform="translate(-455.91977,114.73478)">
            <path
               style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -2832.786,1508.8817 53.9372,-54.9454"
               id="path1738-8" />
            <g
               style="stroke:#b3b3b3;stroke-width:15.88381767;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               transform="matrix(0.59414015,0,0,0.60524511,-1165.1316,603.45053)"
               id="g1291">
              <path
                 style="fill:none;stroke:#b3b3b3;stroke-width:15.88381767;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2806.8368,1405.1923 90.782,90.782"
                 id="path1288" />
            </g>
          </g>
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3518.5445,1435.9958 v 82.3192"
             id="path1744-0" />
          <path
             id="path1358"
             d="m -3256.8775,1477.1554 h -520.2369"
             style="fill:none;stroke:#b3b3b3;stroke-width:11.34523773;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1360"
             d="m -3772.3727,1474.9102 v 43.4048"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1362"
             d="m -3261.7372,1472.6612 v 45.6538"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.76864529;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
        <g
           id="g1392">
          <rect
             y="1302.7863"
             x="-2933.417"
             height="110.76139"
             width="116.91481"
             id="rect1368"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1370"
             width="116.91481"
             height="110.76139"
             x="-2933.417"
             y="1540.7631" />
          <path
             id="path1372"
             d="m -2912.9139,1354.6358 26.5345,26.5344 49.3741,-49.3741"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1374"
             d="m -2874.9595,1435.9958 v 82.3192"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <g
             transform="translate(-69.142187,114.73478)"
             id="g1382">
            <path
               id="path1376"
               d="m -2832.786,1508.8817 53.9372,-54.9454"
               style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <g
               id="g1380"
               transform="matrix(0.59414015,0,0,0.60524511,-1165.1316,603.45053)"
               style="stroke:#b3b3b3;stroke-width:15.88381767;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1">
              <path
                 id="path1378"
                 d="m -2806.8368,1405.1923 90.782,90.782"
                 style="fill:none;stroke:#b3b3b3;stroke-width:15.88381767;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer14">
        <path
           id="rect1161"
           d="m -3552.3573,751.86603 c -27.3627,0 -49.3913,22.02891 -49.3913,49.39183 v 23.51844 h -98.4885 v 96.6587 h 24.1183 c 27.363,0 49.3919,22.0285 49.3919,49.3913 0,27.3629 -22.0289,49.3913 -49.3919,49.3913 h -24.1183 v 96.6588 h 96.6586 v -24.1179 c 0,-27.363 22.0287,-49.3925 49.3914,-49.3925 27.3629,0 49.3913,22.0295 49.3913,49.3925 v 24.1179 h 96.6587 v -96.6588 h 23.8315 c 27.3629,0 49.3919,-22.0284 49.3919,-49.3913 0,-27.3628 -22.029,-49.3913 -49.3919,-49.3913 h -23.8315 v -96.6587 h -94.8288 v -23.51844 c 0,-27.36292 -22.0284,-49.39183 -49.3914,-49.39183 z"
           style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:10;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer13">
        <g
           transform="translate(-20.653077,-452.6035)"
           id="g5454">
          <g
             id="g5385"
             transform="translate(0,8.2052571)">
            <path
               id="path1399"
               d="m -3062.8724,990.56693 a 35.901128,42.182887 0 0 0 35.2944,41.31187 v 0.028 h 0.4753 a 35.901128,42.182887 0 0 0 0.095,0.01 35.901128,42.182887 0 0 0 0.1345,-0.01 h 210.4446 v -41.33977 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.62115765;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1413"
               d="m -2739.7604,694.07811 v 0 h -42.8236 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.99174976;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1443"
               d="m -2757.1721,652.95607 a 28.25238,42.17222 0 0 0 -2.7911,0.63201 28.25238,42.17222 0 0 0 -2.0907,0.79838 28.25238,42.17222 0 0 0 -3.2975,1.69397 28.25238,42.17222 0 0 0 -2.5422,1.83555 28.25238,42.17222 0 0 0 -2.4069,2.20503 28.25238,42.17222 0 0 0 -7.8171,12.02614 28.25238,42.17222 0 0 0 -1.4036,3.65765 28.25238,42.17222 0 0 0 -1.1523,3.84834 28.25238,42.17222 0 0 0 -0.8895,4.00079 28.25238,42.17222 0 0 0 -1.02,10.42262 h 42.8236 13.633 a 28.25238,42.17222 0 0 0 -28.2242,-41.33495 28.25238,42.17222 0 0 0 -2.8205,0.21291 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.99174976;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1403"
               d="m -2966.8735,652.73697 a 38.720119,42.182885 0 0 0 -0.1039,0.006 h -0.5123 v 0.0279 a 38.720119,42.182885 0 0 0 -38.0658,41.3122 h 0.046 v 296.41914 h 152.6331 a 35.176351,42.249119 0 0 0 35.1512,41.41039 35.176351,42.249119 0 0 0 35.1412,-41.41039 V 694.08274 h 42.8236 v -0.004 h -42.8236 v -0.0169 a 28.25238,42.17222 0 0 1 0.063,-2.10685 28.25238,42.17222 0 0 1 0.3384,-4.18528 28.25238,42.17222 0 0 1 0.618,-4.11345 28.25238,42.17222 0 0 1 0.889,-4.00079 28.25238,42.17222 0 0 1 1.1523,-3.84887 28.25238,42.17222 0 0 0 -1.1517,3.84887 28.25238,42.17222 0 0 1 1.1522,-3.84834 28.25238,42.17222 0 0 1 1.4037,-3.65766 28.25238,42.17222 0 0 1 1.6406,-3.42976 28.25238,42.17222 0 0 1 1.863,-3.16828 28.25238,42.17222 0 0 1 2.065,-2.87528 28.25238,42.17222 0 0 1 2.2479,-2.55281 28.25238,42.17222 0 0 1 2.407,-2.20504 28.25238,42.17222 0 0 1 2.5421,-1.83554 28.25238,42.17222 0 0 1 2.6514,-1.44746 28.25238,42.17222 0 0 1 0.6461,-0.24651 28.25238,42.17222 0 0 1 2.0902,-0.79891 28.25238,42.17222 0 0 1 2.7916,-0.63148 28.25238,42.17222 0 0 1 2.8194,-0.21341 h -212.3763 a 38.720119,42.182885 0 0 0 -0.1442,-0.006 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.99174976;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.53386784;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -2754.3516,652.74312 a 28.25238,42.172222 0 0 0 -28.2324,41.33493 h 56.4565 a 28.25238,42.172222 0 0 0 -28.2241,-41.33493 z"
               id="path1405" />
          </g>
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -2973.0999,754.99302 h 157.1547"
             id="path1744-2" />
          <path
             id="path5410"
             d="m -2973.0999,880.71661 h 157.1547"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -2973.0999,817.85481 h 107.7633"
             id="path5412" />
          <path
             id="path5414"
             d="m -2973.0999,943.5784 h 107.7633"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
        <g
           transform="translate(-29.633333,-446.61666)"
           id="g5464">
          <g
             id="g1636">
            <path
               id="path1626"
               d="m -2413.6718,660.33174 v 10e-4 a 38.720119,42.276466 0 0 0 -0.1034,0.006 h -0.5121 v 0.0279 a 38.720119,42.276466 0 0 0 -38.0659,41.40317 h 0.045 v 296.64495 h 0.01 a 38.720119,42.182885 0 0 0 38.0571,41.06004 v 0.028 h 0.5121 a 38.720119,42.182885 0 0 0 0.1044,0.01 l -5e-4,5e-4 a 38.720119,42.182885 0 0 0 0.1447,-0.01 h 212.3762 a 28.25238,42.17222 0 0 1 -2.82,-0.2129 28.25238,42.17222 0 0 1 -2.7921,-0.632 28.25238,42.17222 0 0 1 -2.7363,-1.0449 28.25238,42.17222 0 0 1 -2.652,-1.448 28.25238,42.17222 0 0 1 -2.542,-1.8355 28.25238,42.17222 0 0 1 -2.4071,-2.205 28.25238,42.17222 0 0 1 -2.2474,-2.5529 28.25238,42.17222 0 0 1 -2.0655,-2.8747 28.25238,42.17222 0 0 1 -1.8629,-3.1688 28.25238,42.17222 0 0 1 -1.6413,-3.4298 28.25238,42.17222 0 0 1 -1.4035,-3.6576 28.25238,42.17222 0 0 1 -1.1524,-3.8484 28.25238,42.17222 0 0 1 -0.8888,-4.0013 28.25238,42.17222 0 0 1 -0.6175,-4.114 28.25238,42.17222 0 0 1 -0.339,-4.1847 28.25238,42.17222 0 0 1 -0.064,-2.12442 h 42.8242 v -0.005 h -42.8697 V 701.77004 h 42.8238 v -0.005 h -42.8238 a 28.25238,42.265777 0 0 1 0,-5e-4 v -0.0176 a 28.25238,42.265777 0 0 1 0.01,-0.1602 28.25238,42.265777 0 0 1 0.053,-1.74874 28.25238,42.265777 0 0 0 0,0.0217 28.25238,42.265777 0 0 1 0.01,-0.22376 28.25238,42.265777 0 0 1 0.199,-2.46083 28.25238,42.265777 0 0 0 -0.017,0.22944 28.25238,42.265777 0 0 1 0.1458,-1.80094 28.25238,42.265777 0 0 0 0,0.0171 28.25238,42.265777 0 0 1 0.014,-0.17931 28.25238,42.265777 0 0 1 0.3767,-2.5146 28.25238,42.265777 0 0 0 -0.022,0.15298 28.25238,42.265777 0 0 1 0.2388,-1.59525 28.25238,42.265777 0 0 0 0,0.0119 28.25238,42.265777 0 0 1 0.027,-0.17828 28.25238,42.265777 0 0 1 0.585,-2.63964 28.25238,42.265777 0 0 0 -0.039,0.1814 28.25238,42.265777 0 0 1 0.3034,-1.36893 28.25238,42.265777 0 0 0 0,0.009 28.25238,42.265777 0 0 1 0.042,-0.19119 28.25238,42.265777 0 0 1 0.8274,-2.76934 28.25238,42.265777 0 0 0 -0.038,0.12919 28.25238,42.265777 0 0 1 0.3033,-1.01856 28.25238,42.265777 0 0 1 0,-0.004 28.25238,42.265777 0 0 1 0.057,-0.19431 28.25238,42.265777 0 0 1 1.0237,-2.67166 28.25238,42.265777 0 0 1 0.039,-0.10334 28.25238,42.265777 0 0 1 0.2693,-0.70282 28.25238,42.265777 0 0 0 0,0.008 28.25238,42.265777 0 0 1 0.075,-0.19535 28.25238,42.265777 0 0 1 1.309,-2.74246 28.25238,42.265777 0 0 0 -0.055,0.11782 28.25238,42.265777 0 0 1 0.2956,-0.62013 28.25238,42.265777 0 0 1 0,-0.003 28.25238,42.265777 0 0 1 0.09,-0.19069 28.25238,42.265777 0 0 1 1.5839,-2.7001 28.25238,42.265777 0 0 0 -0.072,0.12404 28.25238,42.265777 0 0 1 0.2455,-0.4191 28.25238,42.265777 0 0 0 -0.01,0.008 28.25238,42.265777 0 0 1 0.1106,-0.18862 28.25238,42.265777 0 0 1 1.8298,-2.55227 28.25238,42.265777 0 0 0 -0.072,0.10178 28.25238,42.265777 0 0 1 0.1891,-0.26405 28.25238,42.265777 0 0 0 -0.01,0.009 28.25238,42.265777 0 0 1 0.1271,-0.17621 28.25238,42.265777 0 0 1 2.066,-2.3518 28.25238,42.265777 0 0 0 -0.07,0.0811 28.25238,42.265777 0 0 1 0.1163,-0.13229 28.25238,42.265777 0 0 0 -0.01,0.006 28.25238,42.265777 0 0 1 0.1421,-0.16123 28.25238,42.265777 0 0 1 2.2526,-2.06862 28.25238,42.265777 0 0 1 13.6974,-5.32627 h -212.3762 a 38.720119,42.276466 0 0 0 -0.1442,-0.006 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1514"
               transform="scale(0.26458333)"
               d="m -8318.8164,2495.9688 a 106.54019,164.51882 0 0 0 -106.4648,161.2539 h 212.8984 a 106.54019,164.51882 0 0 0 -106.4336,-161.2539 z m -107.1875,155.1914 a 106.78065,159.74467 0 0 0 -0.037,1.1796 106.78065,159.74467 0 0 1 0.037,-0.6718 106.78065,159.74467 0 0 1 0,-0.5078 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:36;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1463"
               d="m -2229.0496,996.12973 a 28.413993,43.989193 0 0 0 0.034,1.17047 h -0.01 a 28.25238,42.17222 0 0 0 0.064,2.12391 28.25238,42.17222 0 0 0 0.339,4.18529 28.25238,42.17222 0 0 0 0.6175,4.114 28.25238,42.17222 0 0 0 0.8889,4.0008 28.25238,42.17222 0 0 0 1.1524,3.8489 28.25238,42.17222 0 0 0 1.4035,3.6571 28.25238,42.17222 0 0 0 1.6417,3.4303 28.25238,42.17222 0 0 0 1.3839,2.3549 28.413993,43.989193 0 0 0 20.8737,14.2301 28.413993,43.989193 0 0 0 28.3859,-43.11577 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.99174976;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <path
             id="path5428"
             d="m -2419.3174,754.99302 h 157.1547"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -2419.3174,880.71661 h 157.1547"
             id="path5430" />
          <path
             id="path5432"
             d="m -2419.3174,817.85481 h 107.7633"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -2419.3174,943.5784 h 107.7633"
             id="path5434" />
        </g>
        <g
           transform="translate(-29.633333,-446.61666)"
           id="g5474">
          <g
             id="g1660"
             transform="translate(0,2.0798819)">
            <path
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -1862.3022,700.42602 a 35.901128,42.182887 0 0 1 35.2944,-41.31192 v -0.0279 h 0.4753 a 35.901128,42.182887 0 0 1 0.095,-0.006 35.901128,42.182887 0 0 1 0.1345,0.006 h 210.4446 v 41.3398 z"
               id="path1638" />
            <path
               id="path1640"
               transform="scale(0.26458333)"
               d="m -5979.2656,3767.8672 a 106.78065,159.39107 0 0 0 0.1211,4.0156 106.78065,159.39107 0 0 0 0.1211,4.0137 106.78065,159.39107 0 0 0 1.2793,15.8164 106.78065,159.39107 0 0 0 2.334,15.5469 106.78065,159.39107 0 0 0 7.7148,29.668 106.78065,159.39107 0 0 0 5.3067,13.8242 106.78065,159.39107 0 0 0 6.2031,12.9629 106.78065,159.39107 0 0 0 2.6055,4.4355 106.78065,159.39107 0 0 0 4.4336,7.5411 106.78065,159.39107 0 0 0 7.8066,10.8652 106.78065,159.39107 0 0 0 8.4941,9.6484 106.78065,159.39107 0 0 0 0.3829,0.3516 106.78065,159.39107 0 0 0 28.3476,20.3926 106.78065,159.39107 0 0 0 10.3399,3.9492 106.78065,159.39107 0 0 0 5.2754,1.1934 106.78065,159.39107 0 0 0 5.2754,1.1953 106.78065,159.39107 0 0 0 10.6602,0.8047 v 0 a 106.78065,159.39107 0 0 0 5.3515,-0.207 106.78065,159.39107 0 0 0 10.6192,-1.6075 106.78065,159.39107 0 0 0 10.4609,-3.1796 106.78065,159.39107 0 0 0 10.1934,-4.7207 106.78065,159.39107 0 0 0 9.8261,-6.2188 106.78065,159.39107 0 0 0 8.7012,-7.1113 106.78065,159.39107 0 0 0 51.5215,-133.1836 h -51.5215 -161.8555 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:36;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path1642"
               transform="scale(0.26458333)"
               d="m -6112.082,2491.0117 a 132.94999,160.92976 0 0 0 -132.8535,157.7363 h -576.8829 v 1119.086 h -0.1718 a 146.34376,159.43138 0 0 0 0.1718,5.0117 v 7.002 h 0.6504 a 146.34376,159.43138 0 0 0 143.0469,144.125 v 0.1074 h 1.9375 a 146.34376,159.43138 0 0 0 0.3926,0.037 146.34376,159.43138 0 0 0 0.5469,-0.039 h 802.6816 a 106.78065,159.39107 0 0 1 -10.6602,-0.8047 106.78065,159.39107 0 0 1 -10.5527,-2.3886 106.78065,159.39107 0 0 1 -10.3398,-3.9493 106.78065,159.39107 0 0 1 -10.0254,-5.4707 106.78065,159.39107 0 0 1 -9.6074,-6.9375 106.78065,159.39107 0 0 1 -9.0977,-8.3359 106.78065,159.39107 0 0 1 -8.4941,-9.6484 106.78065,159.39107 0 0 1 -7.8067,-10.8653 106.78065,159.39107 0 0 1 -7.041,-11.9746 106.78065,159.39107 0 0 1 -6.2031,-12.9648 106.78065,159.39107 0 0 1 -5.3047,-13.8223 106.78065,159.39107 0 0 1 -4.3555,-14.5469 106.78065,159.39107 0 0 1 -3.3594,-15.1211 106.78065,159.39107 0 0 1 -2.3339,-15.5488 106.78065,159.39107 0 0 1 -1.2813,-15.8183 106.78065,159.39107 0 0 1 -0.2402,-7.9629 v -0.064 h 161.8554 v -0.02 h -161.8554 V 2648.748 a 132.94999,160.92976 0 0 0 -132.8164,-157.7363 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:36;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1773.45,754.99302 h 157.1547"
             id="path5436" />
          <path
             id="path5438"
             d="m -1773.45,880.71661 h 157.1547"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1773.45,817.85481 h 107.7633"
             id="path5440" />
          <path
             id="path5442"
             d="m -1773.45,943.5784 h 107.7633"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer12">
        <g
           id="g1746"
           transform="translate(15.242344,-268.12178)">
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3633.3134,800.4038 26.5345,26.53439 49.3741,-49.37413"
             id="path1742" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3554.6809,803.93492 h 116.7435"
             id="path1744" />
        </g>
        <g
           transform="translate(0,3.1991768)"
           id="g1669">
          <path
             style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3459.4755,230.77893 h 63.5641 v 373.71319 h -252.3109 v -373.71319 0 h 63.5639"
             id="path1659" />
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1654"
             width="106.26636"
             height="43.404568"
             x="-3575.2"
             y="206.51517" />
        </g>
        <g
           transform="translate(15.242344,-472.18221)"
           id="g1685">
          <path
             id="path1675"
             d="m -3633.3134,800.4038 26.5345,26.53439 49.3741,-49.37413"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1677"
             d="m -3554.6809,803.93492 h 116.7435"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
        <g
           id="g1691"
           transform="translate(15.242344,-370.49409)">
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3633.3134,800.4038 26.5345,26.53439 49.3741,-49.37413"
             id="path1687" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3554.6809,803.93492 h 116.7435"
             id="path1689" />
        </g>
        <g
           id="g1734"
           transform="translate(15.242344,-472.18221)">
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3633.3134,800.4038 26.5345,26.53439 49.3741,-49.37413"
             id="path1730" />
          <path
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -3554.6809,803.93492 h 116.7435"
             id="path1732" />
        </g>
        <g
           transform="translate(15.242344,-370.49409)"
           id="g1740">
          <path
             id="path1736"
             d="m -3633.3134,800.4038 26.5345,26.53439 49.3741,-49.37413"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             id="path1738"
             d="m -3554.6809,803.93492 h 116.7435"
             style="fill:none;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer11">
        <g
           id="g1618"
           transform="translate(-3432.6159,-481.66384)">
          <g
             id="g1602"
             transform="matrix(1.2709081,0,0,1.2709081,1865.1379,0.22557841)">
            <g
               id="g1600"
               transform="translate(-910.16664,-28.574999)">
              <rect
                 y="1343.5273"
                 x="-1338.2998"
                 height="135.789"
                 width="225.30016"
                 id="rect1596"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.07827234;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 id="path1598"
                 d="m -1338.0126,1343.8157 112.3628,74.2523 112.3628,-74.2523 z"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.49464083;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
          </g>
          <path
             id="path1604"
             d="m -820.36353,1843.3955 65.98588,-61.5581 v 39.6043 h 136.66798 v 43.9088 h -136.66798 v 39.604 z"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:3.9000001;stroke-dasharray:none;stroke-opacity:1" />
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer10">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1611">
          <g
             transform="matrix(1.2709081,0,0,1.2709081,1850.3212,-347.96608)"
             id="g1536">
            <g
               transform="translate(-910.16664,-28.574999)"
               id="g1534">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.07827234;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect1530"
                 width="225.30016"
                 height="135.789"
                 x="-1338.2998"
                 y="1343.5273" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.49464083;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1338.0126,1343.8157 112.3628,74.2523 112.3628,-74.2523 z"
                 id="path1532" />
            </g>
          </g>
          <path
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:3.9000001;stroke-dasharray:none;stroke-opacity:1"
             d="m -632.52612,1495.2038 -65.98588,-61.5581 v 39.6043 h -136.66798 v 43.9088 H -698.512 v 39.604 z"
             id="path1538" />
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         style="opacity:1"
         id="layer18">
        <g
           transform="translate(-3445.2827,-503.91183)"
           id="g1180"
           style="opacity:1">
          <g
             id="g1059"
             transform="translate(841.15064,-91.299268)">
            <path
               id="path1053"
               d="m -1897.6137,-108.02079 28.7833,28.783345 -119.5134,119.513439 -119.5134,-119.513439 v 0 l 28.7832,-28.783285"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -1897.6137,-178.39995 28.7833,28.78334 -119.5134,119.513441 -119.5135,-119.513441 v 0 l 28.7833,-28.78327"
               id="path1055" />
            <rect
               transform="rotate(-45)"
               y="-1645.6665"
               x="-1335.2939"
               height="169.01753"
               width="169.01753"
               id="rect1057"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <g
             transform="translate(-30.415683,-859.12656)"
             id="g1116-3">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-9-9"
               cx="-1058.0662"
               cy="488.59421"
               r="63.47197" />
            <g
               transform="matrix(0.99747158,0,0,1.0000051,-569.07842,-456.7783)"
               id="g1292-0">
              <path
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -470.11869,913.62885 a 41.976201,37.842234 0 0 1 21.5246,33.04689 v 0 a 41.976201,37.842234 0 0 1 -21.5087,33.03885"
                 id="path1018-8" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="path1020-8"
                 d="m -774.89979,793.71478 -94.99016,164.52778 -94.99016,-164.52778 z"
                 transform="matrix(0.20172907,0,0,0.18216379,-303.18889,753.04177)" />
              <path
                 id="path1040-5"
                 d="m -510.55801,977.35622 a 41.976201,37.842234 0 0 1 -21.52462,-33.04686 v 0 a 41.976201,37.842234 0 0 1 21.50872,-33.03887"
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 d="m 1113.3891,-1384.702 -94.9901,164.5278 -94.99017,-164.5278 z"
                 id="path1042-0"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 transform="matrix(-0.20175844,0,0,-0.18188853,-296.58256,741.24642)" />
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="g2259"
         style="opacity:1">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g2330">
          <g
             transform="translate(401.1181,-91.299268)"
             id="g2257">
            <path
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -1897.6137,-108.02079 28.7833,28.783345 -119.5134,119.513439 -119.5134,-119.513439 v 0 l 28.7832,-28.783285"
               id="path2251" />
            <path
               id="path2253"
               d="m -1897.6137,-178.39995 28.7833,28.78334 -119.5134,119.513441 -119.5135,-119.513441 v 0 l 28.7833,-28.78327"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <rect
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect2255"
               width="169.01753"
               height="169.01753"
               x="-1335.2939"
               y="-1645.6665"
               transform="rotate(-45)" />
          </g>
          <g
             style="display:inline;opacity:1"
             id="g1235-2"
             transform="translate(-1090.462,-1231.0121)">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-47"
               cx="-437.74243"
               cy="860.28735"
               r="63.47197" />
            <path
               d="m -392.53712,856.72405 -0.0388,7.58774 -90.37182,-0.46108 0.0388,-7.58775 z m -48.99918,-41.62316 7.58784,-7e-5 2e-5,90.373 -7.58786,6e-5 z"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.32291663;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect926-7" />
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         style="opacity:1"
         id="layer9">
        <g
           transform="translate(-3504.5617,-599.55605)"
           id="g2229">
          <path
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1897.6137,-108.02079 28.7833,28.783345 -119.5134,119.513439 -119.5134,-119.513439 v 0 l 28.7832,-28.783285"
             id="path2222" />
          <path
             id="path2224"
             d="m -1897.6137,-178.39995 28.7833,28.78334 -119.5134,119.513441 -119.5135,-119.513441 v 0 l 28.7833,-28.78327"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <rect
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="rect1932"
             width="169.01753"
             height="169.01753"
             x="-1335.2939"
             y="-1645.6665"
             transform="rotate(-45)" />
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         style="display:inline"
         id="layer8">
        <g
           id="g2981">
          <circle
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="path2691"
             cx="-4984.4209"
             cy="1733.2588"
             r="183.6758" />
          <g
             id="g1626-0-0"
             transform="matrix(0.76376965,0,0,0.76376965,-3408.2907,151.56919)">
            <g
               transform="translate(-24.341666,167.21666)"
               id="g1558-3-4">
              <path
                 id="path1561-9-0-6"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <ellipse
                 cy="1922.459"
                 cx="-1947.2753"
                 id="circle1563-6-9-2"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 rx="43.18829"
                 ry="43.188286" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 id="path1567-8-2-6" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1569-5-5-7"
                 cx="-1895.2457"
                 cy="1830.6296"
                 r="30.513643" />
            </g>
            <g
               transform="translate(-22.931285,302.7813)"
               id="g1562-4-4-5">
              <path
                 id="path866-8-3-0-6"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle868-8-3-5-9"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
            <g
               transform="translate(-22.931285,303.25938)"
               id="g1572-3-9-8">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect927-8-8-4-7"
                 width="106.63572"
                 height="62.98344"
                 x="-2137.0515"
                 y="1716.1927" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 id="rect933-5-6-6-2" />
            </g>
          </g>
          <g
             transform="matrix(0.76376965,0,0,0.76376965,-3395.7665,166.70512)"
             id="g1749-8">
            <g
               id="g1735-2"
               transform="translate(-24.341666,167.21666)">
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 id="path1727-9" />
              <ellipse
                 ry="43.188286"
                 rx="43.18829"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="ellipse1729-9"
                 cx="-1947.2753"
                 cy="1922.459" />
              <path
                 id="path1731-6"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 r="30.513643"
                 cy="1830.6296"
                 cx="-1895.2457"
                 id="circle1733-0"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1741-2"
               transform="translate(-22.931285,302.7813)">
              <path
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 id="path1737-7" />
              <circle
                 r="28.444267"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1739-6"
                 cx="-2206.677"
                 cy="1687.8186" />
            </g>
            <g
               id="g1747-1"
               transform="translate(-22.931285,303.25938)">
              <rect
                 y="1716.1927"
                 x="-2137.0515"
                 height="62.98344"
                 width="106.63572"
                 id="rect1743-3"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 id="path1745-2"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
          </g>
          <g
             id="g1793-1"
             transform="matrix(0.76376965,0,0,0.76376965,-3382.0073,182.05105)">
            <g
               transform="translate(-24.341666,167.21666)"
               id="g1779-5">
              <path
                 id="path1771-9"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <ellipse
                 cy="1922.459"
                 cx="-1947.2753"
                 id="ellipse1773-9"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 rx="43.18829"
                 ry="43.188286" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 id="path1775-1" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1777-4"
                 cx="-1895.2457"
                 cy="1830.6296"
                 r="30.513643" />
            </g>
            <g
               transform="translate(-22.931285,302.7813)"
               id="g1785-9">
              <path
                 id="path1781-1"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85190392;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle1783-0"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
            <g
               transform="translate(-22.931285,303.25938)"
               id="g1791-7">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect1787-5"
                 width="106.63572"
                 height="62.98344"
                 x="-2137.0515"
                 y="1716.1927" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 id="path1789-8" />
            </g>
          </g>
        </g>
        <g
           id="g2942">
          <circle
             r="183.6758"
             cy="1316.9387"
             cx="-4984.4209"
             id="circle2908"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <g
             id="g2906"
             transform="translate(-58.88024,-835.14261)">
            <g
               transform="matrix(0.76452855,0,0,0.76452855,-3447.5599,811.29377)"
               id="g1613-0-1">
              <g
                 id="g1562-48-1"
                 transform="translate(133.35,-15.875)">
                <path
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   id="path866-8-8-0" />
                <circle
                   r="28.444267"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   id="circle868-8-8-3"
                   cx="-2206.677"
                   cy="1687.8186" />
              </g>
              <g
                 id="g1572-9-4"
                 transform="translate(133.35,-15.396914)">
                <rect
                   y="1716.1927"
                   x="-2137.0515"
                   height="62.98344"
                   width="106.63572"
                   id="rect927-8-7-0"
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <path
                   id="rect933-5-7-3"
                   d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              </g>
              <g
                 id="g1568-6-9"
                 transform="translate(379.41249,-15.875)">
                <path
                   id="path1564-4-1"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <circle
                   cy="1687.8186"
                   cx="-2206.677"
                   id="circle1566-3-9"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   r="28.444267" />
              </g>
            </g>
            <g
               id="g2854"
               transform="matrix(0.76452855,0,0,0.76452855,-3434.3299,827.16887)">
              <g
                 transform="translate(133.35,-15.875)"
                 id="g2840">
                <path
                   id="path2836"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <circle
                   cy="1687.8186"
                   cx="-2206.677"
                   id="circle2838"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   r="28.444267" />
              </g>
              <g
                 transform="translate(133.35,-15.396914)"
                 id="g2846">
                <rect
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   id="rect2842"
                   width="106.63572"
                   height="62.98344"
                   x="-2137.0515"
                   y="1716.1927" />
                <path
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                   id="path2844" />
              </g>
              <g
                 transform="translate(379.41249,-15.875)"
                 id="g2852">
                <path
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   id="path2848" />
                <circle
                   r="28.444267"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   id="circle2850"
                   cx="-2206.677"
                   cy="1687.8186" />
              </g>
            </g>
            <g
               transform="matrix(0.76452855,0,0,0.76452855,-3421.6291,844.10231)"
               id="g2874">
              <g
                 id="g2860"
                 transform="translate(133.35,-15.875)">
                <path
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   id="path2856" />
                <circle
                   r="28.444267"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   id="circle2858"
                   cx="-2206.677"
                   cy="1687.8186" />
              </g>
              <g
                 id="g2866"
                 transform="translate(133.35,-15.396914)">
                <rect
                   y="1716.1927"
                   x="-2137.0515"
                   height="62.98344"
                   width="106.63572"
                   id="rect2862"
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <path
                   id="path2864"
                   d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                   style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              </g>
              <g
                 id="g2872"
                 transform="translate(379.41249,-15.875)">
                <path
                   id="path2868"
                   d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <circle
                   cy="1687.8186"
                   cx="-2206.677"
                   id="circle2870"
                   style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                   r="28.444267" />
              </g>
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer17">
        <g
           id="g2503">
          <g
             id="g1613-0"
             transform="translate(-3660.0213,-395.64862)">
            <g
               transform="translate(133.35,-15.875)"
               id="g1562-48">
              <path
                 id="path866-8-8"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle868-8-8"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
            <g
               transform="translate(133.35,-15.396914)"
               id="g1572-9">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect927-8-7"
                 width="106.63572"
                 height="62.98344"
                 x="-2137.0515"
                 y="1716.1927" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 id="rect933-5-7" />
            </g>
            <g
               transform="translate(379.41249,-15.875)"
               id="g1568-6">
              <path
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 id="path1564-4" />
              <circle
                 r="28.444267"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1566-3"
                 cx="-2206.677"
                 cy="1687.8186" />
            </g>
          </g>
          <g
             transform="translate(-3643.6235,-377.10639)"
             id="g1725">
            <g
               id="g1711"
               transform="translate(133.35,-15.875)">
              <path
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 id="path1707" />
              <circle
                 r="28.444267"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1709"
                 cx="-2206.677"
                 cy="1687.8186" />
            </g>
            <g
               id="g1717"
               transform="translate(133.35,-15.396914)">
              <rect
                 y="1716.1927"
                 x="-2137.0515"
                 height="62.98344"
                 width="106.63572"
                 id="rect1713"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 id="path1715"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1723"
               transform="translate(379.41249,-15.875)">
              <path
                 id="path1719"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle1721"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
          </g>
        </g>
        <g
           id="g2481">
          <g
             id="g1626-0"
             transform="translate(-3503.74,-344.84862)">
            <g
               transform="translate(-24.341666,167.21666)"
               id="g1558-3">
              <path
                 id="path1561-9-0"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <ellipse
                 cy="1922.459"
                 cx="-1947.2753"
                 id="circle1563-6-9"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 rx="43.18829"
                 ry="43.188286" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 id="path1567-8-2" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1569-5-5"
                 cx="-1895.2457"
                 cy="1830.6296"
                 r="30.513643" />
            </g>
            <g
               transform="translate(-22.931285,302.7813)"
               id="g1562-4-4">
              <path
                 id="path866-8-3-0"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle868-8-3-5"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
            <g
               transform="translate(-22.931285,303.25938)"
               id="g1572-3-9">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect927-8-8-4"
                 width="106.63572"
                 height="62.98344"
                 x="-2137.0515"
                 y="1716.1927" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 id="rect933-5-6-6" />
            </g>
          </g>
          <g
             transform="translate(-3487.3422,-325.03122)"
             id="g1749">
            <g
               id="g1735"
               transform="translate(-24.341666,167.21666)">
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 id="path1727" />
              <ellipse
                 ry="43.188286"
                 rx="43.18829"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="ellipse1729"
                 cx="-1947.2753"
                 cy="1922.459" />
              <path
                 id="path1731"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 r="30.513643"
                 cy="1830.6296"
                 cx="-1895.2457"
                 id="circle1733"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1741"
               transform="translate(-22.931285,302.7813)">
              <path
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 id="path1737" />
              <circle
                 r="28.444267"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1739"
                 cx="-2206.677"
                 cy="1687.8186" />
            </g>
            <g
               id="g1747"
               transform="translate(-22.931285,303.25938)">
              <rect
                 y="1716.1927"
                 x="-2137.0515"
                 height="62.98344"
                 width="106.63572"
                 id="rect1743"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 id="path1745"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
          </g>
          <g
             id="g1793"
             transform="translate(-3487.3422,-325.03122)">
            <g
               transform="translate(-24.341666,167.21666)"
               id="g1779">
              <path
                 id="path1771"
                 d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <ellipse
                 cy="1922.459"
                 cx="-1947.2753"
                 id="ellipse1773"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 rx="43.18829"
                 ry="43.188286" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
                 id="path1775" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1777"
                 cx="-1895.2457"
                 cy="1830.6296"
                 r="30.513643" />
            </g>
            <g
               transform="translate(-22.931285,302.7813)"
               id="g1785">
              <path
                 id="path1781"
                 d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 cy="1687.8186"
                 cx="-2206.677"
                 id="circle1783"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 r="28.444267" />
            </g>
            <g
               transform="translate(-22.931285,303.25938)"
               id="g1791">
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect1787"
                 width="106.63572"
                 height="62.98344"
                 x="-2137.0515"
                 y="1716.1927" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
                 id="path1789" />
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         style="display:inline"
         id="layer7">
        <g
           transform="translate(-4224.4714,-380.18555)"
           id="g1613">
          <g
             id="g1562"
             transform="translate(133.35,-15.875)">
            <path
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
               id="path866-8" />
            <circle
               r="28.444267"
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle868-8"
               cx="-2206.677"
               cy="1687.8186" />
          </g>
          <g
             id="g1572"
             transform="translate(133.35,-15.396914)">
            <rect
               y="1716.1927"
               x="-2137.0515"
               height="62.98344"
               width="106.63572"
               id="rect927-8"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="rect933-5"
               d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <g
             id="g1568"
             transform="translate(379.41249,-15.875)">
            <path
               id="path1564"
               d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <circle
               cy="1687.8186"
               cx="-2206.677"
               id="circle1566"
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               r="28.444267" />
          </g>
        </g>
        <g
           transform="translate(-4080.538,-329.38555)"
           id="g1626">
          <g
             id="g1558"
             transform="translate(-24.341666,167.21666)">
            <path
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.09655309;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -1947.2752,1866.8657 a 55.59326,55.59326 0 0 0 -7.1801,0.5335 l -2.5525,7.1777 a 48.912197,48.912197 0 0 0 -17.2652,7.1318 l -6.8909,-3.2756 a 55.59326,55.59326 0 0 0 -10.121,10.1712 l 3.2599,6.8579 a 48.912197,48.912197 0 0 0 -7.1881,17.2839 l -7.1318,2.5361 a 55.59326,55.59326 0 0 0 -0.5235,7.1767 55.59326,55.59326 0 0 0 0.5335,7.1803 l 7.1779,2.5525 a 48.912197,48.912197 0 0 0 7.1315,17.2649 l -3.2756,6.891 a 55.59326,55.59326 0 0 0 10.1713,10.121 l 6.8578,-3.2598 a 48.912197,48.912197 0 0 0 17.284,7.188 l 2.5361,7.1318 a 55.59326,55.59326 0 0 0 7.1767,0.5237 55.59326,55.59326 0 0 0 7.1802,-0.5337 l 2.5524,-7.1775 a 48.912197,48.912197 0 0 0 17.2651,-7.1318 l 6.891,3.2756 a 55.59326,55.59326 0 0 0 10.121,-10.1713 l -3.2599,-6.8578 a 48.912197,48.912197 0 0 0 7.188,-17.284 l 7.132,-2.5362 a 55.59326,55.59326 0 0 0 0.5234,-7.1767 55.59326,55.59326 0 0 0 -0.5334,-7.1801 l -7.1779,-2.5525 a 48.912197,48.912197 0 0 0 -7.1317,-17.265 l 3.2757,-6.8909 a 55.59326,55.59326 0 0 0 -10.1711,-10.1212 l -6.8581,3.26 a 48.912197,48.912197 0 0 0 -17.2839,-7.1881 l -2.5361,-7.1319 a 55.59326,55.59326 0 0 0 -7.1767,-0.5235 z"
               id="path1561-9" />
            <ellipse
               ry="43.188286"
               rx="43.18829"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.21094966;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle1563-6"
               cx="-1947.2753"
               cy="1922.459" />
            <path
               id="path1567-8"
               d="m -1895.2458,1789.1362 a 41.493483,41.493483 0 0 0 -5.359,0.3981 l -1.9052,5.3573 a 36.506897,36.506897 0 0 0 -12.8863,5.323 l -5.1432,-2.4448 a 41.493483,41.493483 0 0 0 -7.5541,7.5915 l 2.4331,5.1186 a 36.506897,36.506897 0 0 0 -5.365,12.9003 l -5.323,1.8929 a 41.493483,41.493483 0 0 0 -0.3907,5.3565 41.493483,41.493483 0 0 0 0.3981,5.3592 l 5.3574,1.9051 a 36.506897,36.506897 0 0 0 5.3228,12.8862 l -2.4448,5.1432 a 41.493483,41.493483 0 0 0 7.5917,7.5541 l 5.1184,-2.4331 a 36.506897,36.506897 0 0 0 12.9004,5.365 l 1.8929,5.323 a 41.493483,41.493483 0 0 0 5.3565,0.3908 41.493483,41.493483 0 0 0 5.3591,-0.3982 l 1.9051,-5.3572 a 36.506897,36.506897 0 0 0 12.8863,-5.323 l 5.1433,2.4448 a 41.493483,41.493483 0 0 0 7.554,-7.5916 l -2.4331,-5.1185 a 36.506897,36.506897 0 0 0 5.365,-12.9003 l 5.323,-1.893 a 41.493483,41.493483 0 0 0 0.3908,-5.3565 41.493483,41.493483 0 0 0 -0.3982,-5.3591 l -5.3574,-1.9051 a 36.506897,36.506897 0 0 0 -5.3229,-12.8862 l 2.4449,-5.1432 a 41.493483,41.493483 0 0 0 -7.5915,-7.5542 l -5.1187,2.4332 a 36.506897,36.506897 0 0 0 -12.9003,-5.365 l -1.8928,-5.3231 a 41.493483,41.493483 0 0 0 -5.3566,-0.3907 z"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.56481731;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <circle
               r="30.513643"
               cy="1830.6296"
               cx="-1895.2457"
               id="circle1569-5"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.5620929;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
          <g
             id="g1562-4"
             transform="translate(-22.931285,302.7813)">
            <path
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.85199356;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -2176.4874,1726.1723 h -60.0881 l -20.9082,110.7649 h 101.9028 z"
               id="path866-8-3" />
            <circle
               r="28.444267"
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.82484627;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle868-8-3"
               cx="-2206.677"
               cy="1687.8186" />
          </g>
          <g
             id="g1572-3"
             transform="translate(-22.931285,303.25938)">
            <rect
               y="1716.1927"
               x="-2137.0515"
               height="62.98344"
               width="106.63572"
               id="rect927-8-8"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.6261797;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="rect933-5-6"
               d="m -2137.013,1716.4796 53.1558,32.929 53.1557,-32.929 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:7.95210552;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer6">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1279">
          <g
             id="g944"
             transform="translate(-910.16664,-28.574999)">
            <rect
               y="1343.5273"
               x="-1338.2998"
               height="135.789"
               width="225.30016"
               id="rect927"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="rect933"
               d="m -1338.0126,1343.8157 112.3628,74.2523 112.3628,-74.2523 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.57678604;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
        </g>
        <g
           transform="translate(-3426.7328,-490.29627)"
           id="g989">
          <g
             id="g975"
             transform="translate(138.44561,-42.656216)">
            <rect
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.9958334;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect946"
               width="157.7802"
               height="95.094551"
               x="-1901.7225"
               y="1333.1434" />
            <path
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="m -1901.5215,1333.3454 78.6889,51.9997 78.6889,-51.9997 z"
               id="path949" />
          </g>
          <g
             id="g981"
             transform="translate(262.23411,20.65174)"
             style="opacity:1">
            <rect
               y="1333.1434"
               x="-1901.7225"
               height="95.094551"
               width="157.7802"
               id="rect977"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.9958334;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            <path
               id="path979"
               d="m -1901.5215,1333.3454 78.6889,51.9997 78.6889,-51.9997 z"
               style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:9.52499962;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer5">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1236">
          <path
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.25721264;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -525.71296,253.62411 h -137.2324 l -47.7512,252.18962 h 232.731 z"
             id="rect870-0-91-4" />
          <circle
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.1027832;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="path905-9-9-8"
             cx="-594.33112"
             cy="173.58479"
             r="66.993996" />
          <g
             id="g1224"
             transform="translate(-7.4083337)">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-9-2"
               cx="-507.78625"
               cy="468.12787"
               r="63.47197" />
            <g
               transform="matrix(0.63641005,0.63641005,-0.61154028,0.61154028,323.9741,469.89481)"
               id="g1085">
              <path
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:28;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2497.9778,2530.0429 h -15.4766 c -14.1588,0 -25.5574,-11.3986 -25.5574,-25.5574 v -99.3937 c 0,-14.1588 11.3986,-25.5574 25.5574,-25.5574 v 0 h 76.7365 c 14.1588,0 25.5574,11.3986 25.5574,25.5574 v 99.3937 c 0,14.1588 -11.3986,25.5574 -25.5574,25.5574 h -15.4747"
                 id="path1077"
                 transform="scale(0.26458333)" />
              <path
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:28;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2452.1926,2599.5996 h 15.4747 c 14.1588,0 25.5574,11.3986 25.5574,25.5574 v 99.3937 c 0,14.1588 -11.3986,25.5574 -25.5574,25.5574 h -76.7365 c -14.1588,0 -25.5574,-11.3986 -25.5574,-25.5574 v -99.3937 c 0,-14.1588 11.3986,-25.5574 25.5574,-25.5574 v 0 h 15.4766"
                 id="path1080"
                 transform="scale(0.26458333)" />
              <rect
                 rx="3.8080657"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:3.78481984;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect944-3"
                 width="7.6161313"
                 height="46.164276"
                 x="-658.67462"
                 y="655.52679"
                 ry="3.8080657" />
            </g>
          </g>
        </g>
        <g
           transform="translate(-3449.1082,-503.76665)"
           id="g1258">
          <g
             style="display:inline;opacity:1"
             id="g1599-3-8-5"
             transform="translate(1485.212,-85.331339)">
            <g
               id="g1565-8-7-6"
               transform="translate(-220.01628,-58.193105)">
              <path
                 id="path1561-0-2-1"
                 d="m -1902.3174,1011.9294 a 118.7378,118.7378 0 0 0 -15.3356,1.1394 l -5.4517,15.3304 a 104.46818,104.46818 0 0 0 -36.8756,15.2323 l -14.7177,-6.9962 a 118.7378,118.7378 0 0 0 -21.6167,21.7239 l 6.9625,14.6474 a 104.46818,104.46818 0 0 0 -15.3525,36.9155 l -15.2323,5.4167 a 118.7378,118.7378 0 0 0 -1.1181,15.3282 118.7378,118.7378 0 0 0 1.1394,15.3359 l 15.3307,5.4517 a 104.46818,104.46818 0 0 0 15.2317,36.875 l -6.9961,14.7179 a 118.7378,118.7378 0 0 0 21.7242,21.6168 l 14.6471,-6.9625 a 104.46818,104.46818 0 0 0 36.9157,15.3525 l 5.4167,15.2323 a 118.7378,118.7378 0 0 0 15.3283,1.1184 118.7378,118.7378 0 0 0 15.3356,-1.1397 l 5.4516,-15.3301 a 104.46818,104.46818 0 0 0 36.8753,-15.2323 l 14.718,6.9961 a 118.7378,118.7378 0 0 0 21.6167,-21.7241 l -6.9625,-14.6472 a 104.46818,104.46818 0 0 0 15.3523,-36.9155 l 15.2326,-5.4169 a 118.7378,118.7378 0 0 0 1.118,-15.3283 118.7378,118.7378 0 0 0 -1.1393,-15.3355 l -15.3307,-5.4517 a 104.46818,104.46818 0 0 0 -15.2321,-36.8751 l 6.9962,-14.7179 a 118.7378,118.7378 0 0 0 -21.7237,-21.617 l -14.6476,6.9628 a 104.46818,104.46818 0 0 0 -36.9155,-15.3526 l -5.4167,-15.2325 a 118.7378,118.7378 0 0 0 -15.3282,-1.1181 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:4.47788286;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 r="100.35399"
                 cy="1130.6672"
                 cx="-1902.3175"
                 id="circle1563-5-8-1"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:5.13744736;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1591-6-2-5">
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.34218502;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2011.2077,787.71913 a 88.623062,88.623062 0 0 0 -11.4461,0.85043 l -4.0691,11.44224 a 77.972558,77.972558 0 0 0 -27.523,11.36903 l -10.985,-5.2218 a 88.623062,88.623062 0 0 0 -16.1342,16.2142 l 5.1967,10.93247 a 77.972558,77.972558 0 0 0 -11.4588,27.55285 l -11.369,4.04289 a 88.623062,88.623062 0 0 0 -0.8345,11.44061 88.623062,88.623062 0 0 0 0.8504,11.44635 l 11.4425,4.06902 a 77.972558,77.972558 0 0 0 11.3686,27.52262 l -5.2218,10.98509 a 88.623062,88.623062 0 0 0 16.2145,16.13426 l 10.9322,-5.19664 a 77.972558,77.972558 0 0 0 27.553,11.45874 l 4.0429,11.36902 a 88.623062,88.623062 0 0 0 11.4407,0.83475 88.623062,88.623062 0 0 0 11.4461,-0.85065 l 4.069,-11.44202 a 77.972558,77.972558 0 0 0 27.5228,-11.36902 l 10.9852,5.22172 a 88.623062,88.623062 0 0 0 16.1342,-16.21435 l -5.1967,-10.93232 a 77.972558,77.972558 0 0 0 11.4586,-27.55285 l 11.3692,-4.04305 a 88.623062,88.623062 0 0 0 0.8345,-11.44067 88.623062,88.623062 0 0 0 -0.8504,-11.44605 l -11.4424,-4.06902 a 77.972558,77.972558 0 0 0 -11.3689,-27.5227 l 5.2218,-10.98509 a 88.623062,88.623062 0 0 0 -16.2141,-16.13441 l -10.9326,5.19687 a 77.972558,77.972558 0 0 0 -27.5528,-11.45882 l -4.0429,-11.36917 a 88.623062,88.623062 0 0 0 -11.4406,-0.83453 z"
                 id="path1567-6-9-9" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.75522709;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1569-4-9-8"
                 cx="-2011.2078"
                 cy="876.34222"
                 r="73.353943" />
            </g>
          </g>
          <g
             id="g1242">
            <g
               id="g1217">
              <circle
                 r="63.47197"
                 cy="1065.9447"
                 cx="-535.2641"
                 id="circle909-9-6-8"
                 style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46700001;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <g
                 id="g1085-4"
                 transform="matrix(0.63641005,0.63641005,-0.61154027,0.61154027,296.49624,1067.7116)">
                <path
                   transform="scale(0.26458333)"
                   id="path1077-4"
                   d="m -2497.9778,2530.0429 h -15.4766 c -14.1588,0 -25.5574,-11.3986 -25.5574,-25.5574 v -99.3937 c 0,-14.1588 11.3986,-25.5574 25.5574,-25.5574 v 0 h 76.7365 c 14.1588,0 25.5574,11.3986 25.5574,25.5574 v 99.3937 c 0,14.1588 -11.3986,25.5574 -25.5574,25.5574 h -15.4747"
                   style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:28;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <path
                   transform="scale(0.26458333)"
                   id="path1080-4"
                   d="m -2452.1926,2599.5996 h 15.4747 c 14.1588,0 25.5574,11.3986 25.5574,25.5574 v 99.3937 c 0,14.1588 -11.3986,25.5574 -25.5574,25.5574 h -76.7365 c -14.1588,0 -25.5574,-11.3986 -25.5574,-25.5574 v -99.3937 c 0,-14.1588 11.3986,-25.5574 25.5574,-25.5574 v 0 h 15.4766"
                   style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:28;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
                <rect
                   rx="3.8080657"
                   ry="3.8080657"
                   y="655.52679"
                   x="-658.67462"
                   height="46.164276"
                   width="7.6161313"
                   id="rect944-3-7"
                   style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:3.78481984;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              </g>
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         id="layer2">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1142">
          <path
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.25721264;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1068.5845,274.09045 h -137.2324 l -47.7512,252.18962 h 232.731 z"
             id="rect870-0-91" />
          <circle
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.1027832;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="path905-9-9"
             cx="-1137.2026"
             cy="194.05113"
             r="66.993996" />
          <g
             id="g1116">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-9"
               cx="-1058.0662"
               cy="488.59421"
               r="63.47197" />
            <g
               transform="matrix(0.99747158,0,0,1.0000051,-569.07842,-456.7783)"
               id="g1292">
              <path
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -470.11869,913.62885 a 41.976201,37.842234 0 0 1 21.5246,33.04689 v 0 a 41.976201,37.842234 0 0 1 -21.5087,33.03885"
                 id="path1018" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="path1020"
                 d="m -774.89979,793.71478 -94.99016,164.52778 -94.99016,-164.52778 z"
                 transform="matrix(0.20172907,0,0,0.18216379,-303.18889,753.04177)" />
              <path
                 id="path1040"
                 d="m -510.55801,977.35622 a 41.976201,37.842234 0 0 1 -21.52462,-33.04686 v 0 a 41.976201,37.842234 0 0 1 21.50872,-33.03887"
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 d="m 1113.3891,-1384.702 -94.9901,164.5278 -94.99017,-164.5278 z"
                 id="path1042"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 transform="matrix(-0.20175844,0,0,-0.18188853,-296.58256,741.24642)" />
            </g>
          </g>
        </g>
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1838">
          <g
             style="display:inline;opacity:1"
             id="g1599-3-8"
             transform="translate(935.93702,-79.993583)">
            <g
               id="g1565-8-7"
               transform="translate(-220.01628,-58.193105)">
              <path
                 id="path1561-0-2"
                 d="m -1902.3174,1011.9294 a 118.7378,118.7378 0 0 0 -15.3356,1.1394 l -5.4517,15.3304 a 104.46818,104.46818 0 0 0 -36.8756,15.2323 l -14.7177,-6.9962 a 118.7378,118.7378 0 0 0 -21.6167,21.7239 l 6.9625,14.6474 a 104.46818,104.46818 0 0 0 -15.3525,36.9155 l -15.2323,5.4167 a 118.7378,118.7378 0 0 0 -1.1181,15.3282 118.7378,118.7378 0 0 0 1.1394,15.3359 l 15.3307,5.4517 a 104.46818,104.46818 0 0 0 15.2317,36.875 l -6.9961,14.7179 a 118.7378,118.7378 0 0 0 21.7242,21.6168 l 14.6471,-6.9625 a 104.46818,104.46818 0 0 0 36.9157,15.3525 l 5.4167,15.2323 a 118.7378,118.7378 0 0 0 15.3283,1.1184 118.7378,118.7378 0 0 0 15.3356,-1.1397 l 5.4516,-15.3301 a 104.46818,104.46818 0 0 0 36.8753,-15.2323 l 14.718,6.9961 a 118.7378,118.7378 0 0 0 21.6167,-21.7241 l -6.9625,-14.6472 a 104.46818,104.46818 0 0 0 15.3523,-36.9155 l 15.2326,-5.4169 a 118.7378,118.7378 0 0 0 1.118,-15.3283 118.7378,118.7378 0 0 0 -1.1393,-15.3355 l -15.3307,-5.4517 a 104.46818,104.46818 0 0 0 -15.2321,-36.8751 l 6.9962,-14.7179 a 118.7378,118.7378 0 0 0 -21.7237,-21.617 l -14.6476,6.9628 a 104.46818,104.46818 0 0 0 -36.9155,-15.3526 l -5.4167,-15.2325 a 118.7378,118.7378 0 0 0 -15.3282,-1.1181 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:4.47788286;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 r="100.35399"
                 cy="1130.6672"
                 cx="-1902.3175"
                 id="circle1563-5-8"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:5.13744736;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1591-6-2">
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.34218502;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2011.2077,787.71913 a 88.623062,88.623062 0 0 0 -11.4461,0.85043 l -4.0691,11.44224 a 77.972558,77.972558 0 0 0 -27.523,11.36903 l -10.985,-5.2218 a 88.623062,88.623062 0 0 0 -16.1342,16.2142 l 5.1967,10.93247 a 77.972558,77.972558 0 0 0 -11.4588,27.55285 l -11.369,4.04289 a 88.623062,88.623062 0 0 0 -0.8345,11.44061 88.623062,88.623062 0 0 0 0.8504,11.44635 l 11.4425,4.06902 a 77.972558,77.972558 0 0 0 11.3686,27.52262 l -5.2218,10.98509 a 88.623062,88.623062 0 0 0 16.2145,16.13426 l 10.9322,-5.19664 a 77.972558,77.972558 0 0 0 27.553,11.45874 l 4.0429,11.36902 a 88.623062,88.623062 0 0 0 11.4407,0.83475 88.623062,88.623062 0 0 0 11.4461,-0.85065 l 4.069,-11.44202 a 77.972558,77.972558 0 0 0 27.5228,-11.36902 l 10.9852,5.22172 a 88.623062,88.623062 0 0 0 16.1342,-16.21435 l -5.1967,-10.93232 a 77.972558,77.972558 0 0 0 11.4586,-27.55285 l 11.3692,-4.04305 a 88.623062,88.623062 0 0 0 0.8345,-11.44067 88.623062,88.623062 0 0 0 -0.8504,-11.44605 l -11.4424,-4.06902 a 77.972558,77.972558 0 0 0 -11.3689,-27.5227 l 5.2218,-10.98509 a 88.623062,88.623062 0 0 0 -16.2141,-16.13441 l -10.9326,5.19687 a 77.972558,77.972558 0 0 0 -27.5528,-11.45882 l -4.0429,-11.36917 a 88.623062,88.623062 0 0 0 -11.4406,-0.83453 z"
                 id="path1567-6-9" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.75522709;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1569-4-9"
                 cx="-2011.2078"
                 cy="876.34222"
                 r="73.353943" />
            </g>
          </g>
          <g
             id="g1302-7"
             transform="translate(-1021.7847,465.19302)">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-9-6"
               cx="-62.754391"
               cy="606.08948"
               r="63.47197" />
            <g
               transform="translate(427.58397,-339.27822)"
               id="g1292-1">
              <path
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -470.11869,913.62885 a 41.976201,37.842234 0 0 1 21.5246,33.04689 v 0 a 41.976201,37.842234 0 0 1 -21.5087,33.03885"
                 id="path1018-3" />
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="path1020-2"
                 d="m -774.89979,793.71478 -94.99016,164.52778 -94.99016,-164.52778 z"
                 transform="matrix(0.20172907,0,0,0.18216379,-303.18889,753.04177)" />
              <path
                 id="path1040-1"
                 d="m -510.55801,977.35622 a 41.976201,37.842234 0 0 1 -21.52462,-33.04686 v 0 a 41.976201,37.842234 0 0 1 21.50872,-33.03887"
                 style="opacity:1;fill:none;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 d="m 1113.3891,-1384.702 -94.9901,164.5278 -94.99017,-164.5278 z"
                 id="path1042-5"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:2.11666656;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 transform="matrix(-0.20175844,0,0,-0.18188853,-296.58256,741.24642)" />
            </g>
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         style="display:inline"
         id="layer1">
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g2297">
          <path
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.25721264;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -1513.8351,274.09044 h -137.2324 l -47.7512,252.18963 h 232.731 z"
             id="rect870-0" />
          <circle
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.1027832;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="path905-9"
             cx="-1582.4532"
             cy="194.05113"
             r="66.993996" />
          <g
             id="g1235"
             transform="translate(-1065.5743,-371.69312)">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909"
               cx="-437.74243"
               cy="860.28735"
               r="63.47197" />
            <path
               d="m -392.53712,856.72405 -0.0388,7.58774 -90.37182,-0.46108 0.0388,-7.58775 z m -48.99918,-41.62316 7.58784,-7e-5 2e-5,90.373 -7.58786,6e-5 z"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.32291663;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect926" />
          </g>
        </g>
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1850">
          <g
             style="display:inline;opacity:1"
             id="g1599-3"
             transform="translate(490.37869,-79.97445)">
            <g
               id="g1565-8"
               transform="translate(-220.01628,-58.193105)">
              <path
                 id="path1561-0"
                 d="m -1902.3174,1011.9294 a 118.7378,118.7378 0 0 0 -15.3356,1.1394 l -5.4517,15.3304 a 104.46818,104.46818 0 0 0 -36.8756,15.2323 l -14.7177,-6.9962 a 118.7378,118.7378 0 0 0 -21.6167,21.7239 l 6.9625,14.6474 a 104.46818,104.46818 0 0 0 -15.3525,36.9155 l -15.2323,5.4167 a 118.7378,118.7378 0 0 0 -1.1181,15.3282 118.7378,118.7378 0 0 0 1.1394,15.3359 l 15.3307,5.4517 a 104.46818,104.46818 0 0 0 15.2317,36.875 l -6.9961,14.7179 a 118.7378,118.7378 0 0 0 21.7242,21.6168 l 14.6471,-6.9625 a 104.46818,104.46818 0 0 0 36.9157,15.3525 l 5.4167,15.2323 a 118.7378,118.7378 0 0 0 15.3283,1.1184 118.7378,118.7378 0 0 0 15.3356,-1.1397 l 5.4516,-15.3301 a 104.46818,104.46818 0 0 0 36.8753,-15.2323 l 14.718,6.9961 a 118.7378,118.7378 0 0 0 21.6167,-21.7241 l -6.9625,-14.6472 a 104.46818,104.46818 0 0 0 15.3523,-36.9155 l 15.2326,-5.4169 a 118.7378,118.7378 0 0 0 1.118,-15.3283 118.7378,118.7378 0 0 0 -1.1393,-15.3355 l -15.3307,-5.4517 a 104.46818,104.46818 0 0 0 -15.2321,-36.8751 l 6.9962,-14.7179 a 118.7378,118.7378 0 0 0 -21.7237,-21.617 l -14.6476,6.9628 a 104.46818,104.46818 0 0 0 -36.9155,-15.3526 l -5.4167,-15.2325 a 118.7378,118.7378 0 0 0 -15.3282,-1.1181 z"
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:4.47788286;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <circle
                 r="100.35399"
                 cy="1130.6672"
                 cx="-1902.3175"
                 id="circle1563-5"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:5.13744736;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g
               id="g1591-6">
              <path
                 style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.34218502;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m -2011.2077,787.71913 a 88.623062,88.623062 0 0 0 -11.4461,0.85043 l -4.0691,11.44224 a 77.972558,77.972558 0 0 0 -27.523,11.36903 l -10.985,-5.2218 a 88.623062,88.623062 0 0 0 -16.1342,16.2142 l 5.1967,10.93247 a 77.972558,77.972558 0 0 0 -11.4588,27.55285 l -11.369,4.04289 a 88.623062,88.623062 0 0 0 -0.8345,11.44061 88.623062,88.623062 0 0 0 0.8504,11.44635 l 11.4425,4.06902 a 77.972558,77.972558 0 0 0 11.3686,27.52262 l -5.2218,10.98509 a 88.623062,88.623062 0 0 0 16.2145,16.13426 l 10.9322,-5.19664 a 77.972558,77.972558 0 0 0 27.553,11.45874 l 4.0429,11.36902 a 88.623062,88.623062 0 0 0 11.4407,0.83475 88.623062,88.623062 0 0 0 11.4461,-0.85065 l 4.069,-11.44202 a 77.972558,77.972558 0 0 0 27.5228,-11.36902 l 10.9852,5.22172 a 88.623062,88.623062 0 0 0 16.1342,-16.21435 l -5.1967,-10.93232 a 77.972558,77.972558 0 0 0 11.4586,-27.55285 l 11.3692,-4.04305 a 88.623062,88.623062 0 0 0 0.8345,-11.44067 88.623062,88.623062 0 0 0 -0.8504,-11.44605 l -11.4424,-4.06902 a 77.972558,77.972558 0 0 0 -11.3689,-27.5227 l 5.2218,-10.98509 a 88.623062,88.623062 0 0 0 -16.2141,-16.13441 l -10.9326,5.19687 a 77.972558,77.972558 0 0 0 -27.5528,-11.45882 l -4.0429,-11.36917 a 88.623062,88.623062 0 0 0 -11.4406,-0.83453 z"
                 id="path1567-6" />
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.75522709;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="circle1569-4"
                 cx="-2011.2078"
                 cy="876.34222"
                 r="73.353943" />
            </g>
          </g>
          <g
             style="display:inline"
             id="g1235-0"
             transform="translate(-1092.4031,210.92211)">
            <circle
               style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.46666622;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="circle909-4"
               cx="-437.74243"
               cy="860.28735"
               r="63.47197" />
            <path
               d="m -392.53712,856.72405 -0.0388,7.58774 -90.37182,-0.46108 0.0388,-7.58775 z m -48.99918,-41.62316 7.58784,-7e-5 2e-5,90.373 -7.58786,6e-5 z"
               style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:1.32291663;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               id="rect926-6" />
          </g>
        </g>
      </g>
      <g
         transform="translate(5686.0686,-202.30687)"
         style="display:inline;opacity:1"
         id="layer3">
        <g
           transform="translate(-4437.0116,-609.74064)"
           id="g1324">
          <path
             id="path866"
             d="m -983.12639,380.06443 h -137.23251 l -47.7511,252.18963 h 232.73102 z"
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.25711632;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <circle
             cy="300.02512"
             cx="-1051.7445"
             id="circle868"
             style="display:inline;opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:8.10286427;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             r="66.993996" />
        </g>
        <g
           transform="translate(-3441.6999,-503.76665)"
           id="g1131">
          <path
             id="path1561"
             d="m -2123.392,873.76185 a 118.7378,118.7378 0 0 0 -15.3356,1.1394 l -5.4517,15.3304 a 104.46818,104.46818 0 0 0 -36.8756,15.2323 l -14.7177,-6.9962 a 118.7378,118.7378 0 0 0 -21.6167,21.7239 l 6.9625,14.6474 a 104.46818,104.46818 0 0 0 -15.3525,36.9155 l -15.2323,5.4167 a 118.7378,118.7378 0 0 0 -1.1181,15.3282 118.7378,118.7378 0 0 0 1.1394,15.33585 l 15.3307,5.4518 a 104.46818,104.46818 0 0 0 15.2317,36.875 l -6.9961,14.7179 a 118.7378,118.7378 0 0 0 21.7242,21.6168 l 14.6471,-6.9625 a 104.46818,104.46818 0 0 0 36.9157,15.3525 l 5.4167,15.2322 a 118.7378,118.7378 0 0 0 15.3283,1.1185 118.7378,118.7378 0 0 0 15.3356,-1.1397 l 5.4516,-15.3301 a 104.46818,104.46818 0 0 0 36.8753,-15.2323 l 14.718,6.9961 a 118.7378,118.7378 0 0 0 21.6167,-21.7241 l -6.9625,-14.6472 a 104.46818,104.46818 0 0 0 15.3523,-36.9155 l 15.2326,-5.4169 a 118.7378,118.7378 0 0 0 1.118,-15.32835 118.7378,118.7378 0 0 0 -1.1393,-15.3355 l -15.3307,-5.4517 a 104.46818,104.46818 0 0 0 -15.2321,-36.8751 l 6.9962,-14.7179 a 118.7378,118.7378 0 0 0 -21.7237,-21.617 l -14.6476,6.9628 a 104.46818,104.46818 0 0 0 -36.9155,-15.3526 l -5.4167,-15.2325 a 118.7378,118.7378 0 0 0 -15.3282,-1.1181 z"
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:4.47788286;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <circle
             r="100.35399"
             cy="992.49969"
             cx="-2123.3921"
             id="circle1563"
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:5.13744736;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
          <path
             style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.34218502;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             d="m -2012.266,707.74468 a 88.623062,88.623062 0 0 0 -11.4461,0.85043 l -4.0691,11.44224 a 77.972558,77.972558 0 0 0 -27.523,11.36903 l -10.985,-5.2218 a 88.623062,88.623062 0 0 0 -16.1342,16.2142 l 5.1967,10.93247 a 77.972558,77.972558 0 0 0 -11.4588,27.55285 l -11.369,4.04289 a 88.623062,88.623062 0 0 0 -0.8345,11.44061 88.623062,88.623062 0 0 0 0.8504,11.44635 l 11.4425,4.06902 a 77.972558,77.972558 0 0 0 11.3686,27.52262 l -5.2218,10.98509 a 88.623062,88.623062 0 0 0 16.2145,16.13426 l 10.9322,-5.19664 a 77.972558,77.972558 0 0 0 27.553,11.45874 l 4.0429,11.36902 a 88.623062,88.623062 0 0 0 11.4407,0.83475 88.623062,88.623062 0 0 0 11.4461,-0.85065 l 4.069,-11.44202 a 77.972558,77.972558 0 0 0 27.5228,-11.36902 l 10.9852,5.22172 a 88.623062,88.623062 0 0 0 16.1342,-16.21435 l -5.1967,-10.93232 a 77.972558,77.972558 0 0 0 11.4586,-27.55285 l 11.3692,-4.04305 a 88.623062,88.623062 0 0 0 0.8345,-11.44067 88.623062,88.623062 0 0 0 -0.8504,-11.44605 l -11.4424,-4.06902 a 77.972558,77.972558 0 0 0 -11.3689,-27.5227 l 5.2218,-10.98509 a 88.623062,88.623062 0 0 0 -16.2141,-16.13441 l -10.9326,5.19687 a 77.972558,77.972558 0 0 0 -27.5528,-11.45882 l -4.0429,-11.36917 a 88.623062,88.623062 0 0 0 -11.4406,-0.83453 z"
             id="path1567" />
          <circle
             style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#b3b3b3;stroke-width:3.75522709;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
             id="circle1569"
             cx="-2012.2661"
             cy="796.3678"
             r="73.353943" />
        </g>
      </g>
    </svg>
  `;

    return `${SVG_PREFIX}${encodeURIComponent(template)}`;
  }
}
