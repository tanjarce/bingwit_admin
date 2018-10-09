import React, { Component } from 'react'
import { PulseLoader } from 'react-spinners'
import { Button } from 'reactstrap'

class ButtonSpinner extends Component {
    render() {
        const { isLoading = false, color, text , size, spinnerColor = "#000", spinnerSize, block = true} = this.props
        return (
            <div>
                {isLoading && (
                    <div className="text-center">
                        <Button 
                            color={color}
                            size={size}
                            block={block}
                        >
                        <span className="d-flex justify-content-center">
                            {text}
                            <PulseLoader
                                color={spinnerColor} 
                                loading={isLoading} 
                                size={spinnerSize}
                            />
                        </span>
                        </Button>
                    </div>
                )}
                {!isLoading && (
                    <Button 
                        color={color}
                        size={size}
                        block={block}
                    >
                    {text}
                    </Button>
                )}
            </div>
        );
    }
}

export default ButtonSpinner;