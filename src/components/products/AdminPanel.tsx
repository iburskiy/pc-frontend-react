import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../widgets/Button';

export const AdminPanel = () => {

  return <div className="admin-panel">
            <div className="admin-panel__button-wrapper">
              <Button path='/product/new' preventDefault={false} className="button button_red" label="Add Product" iconNode={<FontAwesomeIcon icon="plus" />}/>
            </div>
            <div className="admin-panel__button-wrapper">
              <Button path='/product/fields' preventDefault={false} className="button button_red admin-panel__fields" label="Edit Fields" iconNode={<FontAwesomeIcon icon="edit" />}/>
            </div>
            <div className="admin-panel__button-wrapper">
              <Button path='/product/filters' preventDefault={false} className="button button_red admin-panel__fields" label="Config Filters" iconNode={<FontAwesomeIcon icon="filter" />}/>
            </div>
          </div>
}