import React from 'react'
import Liform, { DefaultTheme, renderField } from 'liform-react'
import classNames from 'classnames'
import { Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

const CustomWidget = props =>  {
    return (
        <div>
        {props.label && <legend>{props.label}</legend>}
        {renderField(props.schema.properties.choice, 'choice', props.theme, props.fieldName + '.', props.context)}
        { props.additionalSelected === 'name' &&
                renderField(props.schema.properties.name, 'name', props.theme, props.fieldName + '.', props.context)
        }
        { props.additionalSelected === 'favorite color' &&
                renderField(props.schema.properties.favoriteColor, 'favoriteColor', props.theme, props.fieldName + '.', props.context)
        }
        </div>
    )
}

const selector = formValueSelector('my-complex-form')
const CustomWidgetConnected = connect(
    state => {
        return {
            additionalSelected: selector(state, 'additional.choice'),
        }
    }
)(CustomWidget);

const myTheme = { ...DefaultTheme, 'my-dynamic-widget': CustomWidgetConnected }

const schema={
    'title': 'my-complex-form',
    'properties': {
        'email': {
            'title':'E-mail',
            'type':'string',
            'format':'email',
        },
        'additional': {
            'title':'Additional info',
            'type':'object',
            'widget':'my-dynamic-widget',
            'properties': {
                'choice': {
                    'type': 'string',
                    'enum': [
                        'name',
                        'favorite color',
                    ]
                },
                'name': {
                    'type': 'string',
                },
                'favoriteColor': {
                    'type': 'string',
                    'title': 'favorite color',
                    'widget': 'color',
                }
            }
        }
    }
}

const Example = (props) => (
    <Liform schema={schema}
        onSubmit={props.onSubmit}
        theme={myTheme}
    />
)

export default Example

