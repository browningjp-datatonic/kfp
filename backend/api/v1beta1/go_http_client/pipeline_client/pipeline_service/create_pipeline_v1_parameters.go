// Code generated by go-swagger; DO NOT EDIT.

package pipeline_service

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"
	"net/http"
	"time"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	cr "github.com/go-openapi/runtime/client"

	strfmt "github.com/go-openapi/strfmt"

	pipeline_model "github.com/kubeflow/pipelines/backend/api/v1beta1/go_http_client/pipeline_model"
)

// NewCreatePipelineV1Params creates a new CreatePipelineV1Params object
// with the default values initialized.
func NewCreatePipelineV1Params() *CreatePipelineV1Params {
	var ()
	return &CreatePipelineV1Params{

		timeout: cr.DefaultTimeout,
	}
}

// NewCreatePipelineV1ParamsWithTimeout creates a new CreatePipelineV1Params object
// with the default values initialized, and the ability to set a timeout on a request
func NewCreatePipelineV1ParamsWithTimeout(timeout time.Duration) *CreatePipelineV1Params {
	var ()
	return &CreatePipelineV1Params{

		timeout: timeout,
	}
}

// NewCreatePipelineV1ParamsWithContext creates a new CreatePipelineV1Params object
// with the default values initialized, and the ability to set a context for a request
func NewCreatePipelineV1ParamsWithContext(ctx context.Context) *CreatePipelineV1Params {
	var ()
	return &CreatePipelineV1Params{

		Context: ctx,
	}
}

// NewCreatePipelineV1ParamsWithHTTPClient creates a new CreatePipelineV1Params object
// with the default values initialized, and the ability to set a custom HTTPClient for a request
func NewCreatePipelineV1ParamsWithHTTPClient(client *http.Client) *CreatePipelineV1Params {
	var ()
	return &CreatePipelineV1Params{
		HTTPClient: client,
	}
}

/*CreatePipelineV1Params contains all the parameters to send to the API endpoint
for the create pipeline v1 operation typically these are written to a http.Request
*/
type CreatePipelineV1Params struct {

	/*Body*/
	Body *pipeline_model.APIPipeline

	timeout    time.Duration
	Context    context.Context
	HTTPClient *http.Client
}

// WithTimeout adds the timeout to the create pipeline v1 params
func (o *CreatePipelineV1Params) WithTimeout(timeout time.Duration) *CreatePipelineV1Params {
	o.SetTimeout(timeout)
	return o
}

// SetTimeout adds the timeout to the create pipeline v1 params
func (o *CreatePipelineV1Params) SetTimeout(timeout time.Duration) {
	o.timeout = timeout
}

// WithContext adds the context to the create pipeline v1 params
func (o *CreatePipelineV1Params) WithContext(ctx context.Context) *CreatePipelineV1Params {
	o.SetContext(ctx)
	return o
}

// SetContext adds the context to the create pipeline v1 params
func (o *CreatePipelineV1Params) SetContext(ctx context.Context) {
	o.Context = ctx
}

// WithHTTPClient adds the HTTPClient to the create pipeline v1 params
func (o *CreatePipelineV1Params) WithHTTPClient(client *http.Client) *CreatePipelineV1Params {
	o.SetHTTPClient(client)
	return o
}

// SetHTTPClient adds the HTTPClient to the create pipeline v1 params
func (o *CreatePipelineV1Params) SetHTTPClient(client *http.Client) {
	o.HTTPClient = client
}

// WithBody adds the body to the create pipeline v1 params
func (o *CreatePipelineV1Params) WithBody(body *pipeline_model.APIPipeline) *CreatePipelineV1Params {
	o.SetBody(body)
	return o
}

// SetBody adds the body to the create pipeline v1 params
func (o *CreatePipelineV1Params) SetBody(body *pipeline_model.APIPipeline) {
	o.Body = body
}

// WriteToRequest writes these params to a swagger request
func (o *CreatePipelineV1Params) WriteToRequest(r runtime.ClientRequest, reg strfmt.Registry) error {

	if err := r.SetTimeout(o.timeout); err != nil {
		return err
	}
	var res []error

	if o.Body != nil {
		if err := r.SetBodyParam(o.Body); err != nil {
			return err
		}
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}