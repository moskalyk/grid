/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.4-330
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


// Services
export interface HelloPeerDef {
    hello: (tx: string, callParams: CallParams<'tx'>) => string | Promise<string>;
}
export function registerHelloPeer(service: HelloPeerDef): void;
export function registerHelloPeer(serviceId: string, service: HelloPeerDef): void;
export function registerHelloPeer(peer: FluencePeer, service: HelloPeerDef): void;
export function registerHelloPeer(peer: FluencePeer, serviceId: string, service: HelloPeerDef): void;
       

// Functions
 

export function sayHello(
    targetPeerId: string,
    targetRelayPeerId: string,
    tx: string,
    config?: {ttl?: number}
): Promise<string>;

export function sayHello(
    peer: FluencePeer,
    targetPeerId: string,
    targetRelayPeerId: string,
    tx: string,
    config?: {ttl?: number}
): Promise<string>;

