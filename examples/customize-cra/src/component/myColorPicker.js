import * as React from "react";
import ReactDOM from 'react-dom';
import Picker from "@simonwep/pickr";
import '@simonwep/pickr/dist/themes/monolith.min.css';  // 'monolith' theme
// interface MyColorPickerProps {
//     onSave: (color: string) => void;
//     className?: string;
//     containerStyle?: React.CSSProperties;
// };

export const MyColorPicker = (props => {
    const oRef = React.useRef(null);
    const pickRef = React.useRef(null);

    React.useEffect(() => {
        pickRef.current = Picker.create({
            el: ReactDOM.findDOMNode(oRef.current),
            theme: "monolith", // or 'monolith', or 'nano',
            appClass: props.className,
            default: props.initialColor || null,
            swatches: [
                'rgba(244, 67, 54, 1)',
                'rgba(233, 30, 99, 1)',
                'rgba(156, 39, 176, 1)',
                'rgba(103, 58, 183, 1)',
                'rgba(63, 81, 181, 1)',
                'rgba(33, 150, 243, 1)',
                'rgba(3, 169, 244, 1)',
                'rgba(0, 188, 212, 1)',
                'rgba(0, 150, 136, 1)',
                'rgba(76, 175, 80, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(205, 220, 57, 1)',
                'rgba(255, 235, 59, 1)',
                'rgba(255, 193, 7, 1)'
            ],
            components: {
                // Main components
                preview: true,
                opacity: false,
                hue: true,
                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: true,
                    input: true,
                    clear: true,
                    save: true
                }
            }
        });
        pickRef.current.on("save", (color, pick) => {
            if (color) {
                props.onSave(color.toHEXA().toString());
            }
        }).on("clear", () => {
            if (props.onClear) {
                props.onClear()
            }
        })

        return () => {
            pickRef.current.destroyAndRemove();
        }
    }, []);

    // initialColor
    React.useEffect(() => {
        if (pickRef.current) {
            if (props.initialColor) {
                pickRef.current.setColor(props.initialColor)
            } else {
                pickRef.current.setColor(null)
            }
        }
    }, [props.initialColor]);

    return (
        <div style={props.containerStyle}>
            <div ref={oRef}/>
        </div>
    )
})
