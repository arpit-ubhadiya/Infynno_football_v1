'use client'

import axios from 'axios';

import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { Toaster, toast } from 'sonner';

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { useQueryState, parseAsString, parseAsIsoDate } from 'nuqs'

import debounce from "lodash.debounce";

export {
  axios,

  // React-Query
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
  ReactQueryDevtools,
  type UseQueryOptions,

  // LoadingBar
  LoadingBar,
  type LoadingBarRef,

  // sonner toaster
  Toaster,
  toast,

  // Nuqs Adapter
  NuqsAdapter,
  useQueryState as useNuqsQueryState,
  parseAsString, parseAsIsoDate,

  // debounce
  debounce,

}