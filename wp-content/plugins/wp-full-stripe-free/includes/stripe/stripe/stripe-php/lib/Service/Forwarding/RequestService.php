<?php

// File generated from our OpenAPI spec

namespace StripeWPFS\Stripe\Service\Forwarding;

/**
 * @phpstan-import-type RequestOptionsArray from \Stripe\Util\RequestOptions
 *
 * @psalm-import-type RequestOptionsArray from \Stripe\Util\RequestOptions
 */
class RequestService extends \StripeWPFS\Stripe\Service\AbstractService
{
    /**
     * Lists all ForwardingRequest objects.
     *
     * @param null|array{created?: array{gt?: int, gte?: int, lt?: int, lte?: int}, ending_before?: string, expand?: string[], limit?: int, starting_after?: string} $params
     * @param null|RequestOptionsArray|\StripeWPFS\Stripe\Util\RequestOptions $opts
     *
     * @return \StripeWPFS\Stripe\Collection<\StripeWPFS\Stripe\Forwarding\Request>
     *
     * @throws \StripeWPFS\Stripe\Exception\ApiErrorException if the request fails
     */
    public function all($params = null, $opts = null)
    {
        return $this->requestCollection('get', '/v1/forwarding/requests', $params, $opts);
    }

    /**
     * Creates a ForwardingRequest object.
     *
     * @param null|array{expand?: string[], metadata?: array<string, string>, payment_method: string, replacements: string[], request: array{body?: string, headers?: array{name: string, value: string}[]}, url: string} $params
     * @param null|RequestOptionsArray|\StripeWPFS\Stripe\Util\RequestOptions $opts
     *
     * @return \StripeWPFS\Stripe\Forwarding\Request
     *
     * @throws \StripeWPFS\Stripe\Exception\ApiErrorException if the request fails
     */
    public function create($params = null, $opts = null)
    {
        return $this->request('post', '/v1/forwarding/requests', $params, $opts);
    }

    /**
     * Retrieves a ForwardingRequest object.
     *
     * @param string $id
     * @param null|array{expand?: string[]} $params
     * @param null|RequestOptionsArray|\StripeWPFS\Stripe\Util\RequestOptions $opts
     *
     * @return \StripeWPFS\Stripe\Forwarding\Request
     *
     * @throws \StripeWPFS\Stripe\Exception\ApiErrorException if the request fails
     */
    public function retrieve($id, $params = null, $opts = null)
    {
        return $this->request('get', $this->buildPath('/v1/forwarding/requests/%s', $id), $params, $opts);
    }
}
