<?php

// File generated from our OpenAPI spec

namespace StripeWPFS\Stripe\Service\Treasury;

/**
 * @phpstan-import-type RequestOptionsArray from \Stripe\Util\RequestOptions
 *
 * @psalm-import-type RequestOptionsArray from \Stripe\Util\RequestOptions
 */
class ReceivedCreditService extends \StripeWPFS\Stripe\Service\AbstractService
{
    /**
     * Returns a list of ReceivedCredits.
     *
     * @param null|array{ending_before?: string, expand?: string[], financial_account: string, limit?: int, linked_flows?: array{source_flow_type: string}, starting_after?: string, status?: string} $params
     * @param null|RequestOptionsArray|\StripeWPFS\Stripe\Util\RequestOptions $opts
     *
     * @return \StripeWPFS\Stripe\Collection<\StripeWPFS\Stripe\Treasury\ReceivedCredit>
     *
     * @throws \StripeWPFS\Stripe\Exception\ApiErrorException if the request fails
     */
    public function all($params = null, $opts = null)
    {
        return $this->requestCollection('get', '/v1/treasury/received_credits', $params, $opts);
    }

    /**
     * Retrieves the details of an existing ReceivedCredit by passing the unique
     * ReceivedCredit ID from the ReceivedCredit list.
     *
     * @param string $id
     * @param null|array{expand?: string[]} $params
     * @param null|RequestOptionsArray|\StripeWPFS\Stripe\Util\RequestOptions $opts
     *
     * @return \StripeWPFS\Stripe\Treasury\ReceivedCredit
     *
     * @throws \StripeWPFS\Stripe\Exception\ApiErrorException if the request fails
     */
    public function retrieve($id, $params = null, $opts = null)
    {
        return $this->request('get', $this->buildPath('/v1/treasury/received_credits/%s', $id), $params, $opts);
    }
}
