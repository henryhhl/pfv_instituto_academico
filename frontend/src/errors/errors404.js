
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

export default function Error404() {
    const navigate = useNavigate();

    function onInit() {
        navigate('/inicio');
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div></div>
                    </h1>
                    <div className="row">
                        <div className="col-12 mb-5">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <Result
                                        status="404"
                                        title="404"
                                        subTitle="Lo sentimos, la página que visitaste no existe."
                                        style={{ width: '100%', maxWidth: '100%', }}
                                        extra={
                                            <Button type="primary"
                                                onClick={onInit}
                                            >
                                                volver al inicio
                                            </Button>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
};
