import {isExpired} from "./JwtHelper";

describe("JwtHelper", () => {
  describe("isExpired", () => {
    it("should return true if token is expired", () => {
      const expired2007Token =
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYW55QGJpbGxzLmNvbSIsImV4cCI6MTE5ODU1ODI2MSwicm9sZXMiOlsiMzgiLCIzOSIsIjQ4IiwiNDkiLCI1MCIsIjUxIiwiNTIiLCI1MyIsIjU0IiwiNTUiLCI1NiIsIjU3IiwiNTgiLCI1OSIsIjYwIiwiNjEiLCI3NyIsIjc4IiwiNzkiLCI4MCIsIjgxIiwiODIiLCI4MyIsIjg0IiwiOTciLCI5OCIsIjk5IiwiUkVTUE9OU0lCTEVfNDgiLCJSRVNQT05TSUJMRV80OSIsIlJFU1BPTlNJQkxFXzUwIiwiUkVTUE9OU0lCTEVfNTEiLCJSRVNQT05TSUJMRV81MiIsIlJFU1BPTlNJQkxFXzUzIiwiUkVTUE9OU0lCTEVfNTQiLCJSRVNQT05TSUJMRV81NSIsIlJFU1BPTlNJQkxFXzU2IiwiUkVTUE9OU0lCTEVfNTciLCJSRVNQT05TSUJMRV81OCIsIlJFU1BPTlNJQkxFXzU5IiwiUkVTUE9OU0lCTEVfNjAiLCJSRVNQT05TSUJMRV82MSJdfQ.byjudzuBKZ91K8Yv_hODqzzbUKFQseASl4rtim9_jAfQmrkqu2Qg-hj4NB0K4ppB6KBVJFW9vrwIaS3DUoSInA";

      const isTokenExpired = isExpired(expired2007Token);
      expect(isTokenExpired).toBeTruthy();
    });

    it("should return false if token is not expired", () => {
      const valid2332Token =
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYW55QGJpbGxzLmNvbSIsImV4cCI6MTExMjg1NTgyNjEsInJvbGVzIjpbIjM4IiwiMzkiLCI0OCIsIjQ5IiwiNTAiLCI1MSIsIjUyIiwiNTMiLCI1NCIsIjU1IiwiNTYiLCI1NyIsIjU4IiwiNTkiLCI2MCIsIjYxIiwiNzciLCI3OCIsIjc5IiwiODAiLCI4MSIsIjgyIiwiODMiLCI4NCIsIjk3IiwiOTgiLCI5OSIsIlJFU1BPTlNJQkxFXzQ4IiwiUkVTUE9OU0lCTEVfNDkiLCJSRVNQT05TSUJMRV81MCIsIlJFU1BPTlNJQkxFXzUxIiwiUkVTUE9OU0lCTEVfNTIiLCJSRVNQT05TSUJMRV81MyIsIlJFU1BPTlNJQkxFXzU0IiwiUkVTUE9OU0lCTEVfNTUiLCJSRVNQT05TSUJMRV81NiIsIlJFU1BPTlNJQkxFXzU3IiwiUkVTUE9OU0lCTEVfNTgiLCJSRVNQT05TSUJMRV81OSIsIlJFU1BPTlNJQkxFXzYwIiwiUkVTUE9OU0lCTEVfNjEiXX0.jKJiqw0qg_5TLT-6xcfOjJru4NLRHFYMJFicB2OJaquJGjSsB3BuaGVl425N4BwnnVjg309YSnIK6qgNlzq1mQ";

      const isTokenExpired = isExpired(valid2332Token);
      expect(isTokenExpired).toBeFalsy();
    });

    it("should return true if token is invalid", () => {
      const invalidToken = "BLAH";

      const isTokenExpired = isExpired(invalidToken);
      expect(isTokenExpired).toBeTruthy();
    });

    it("should return true if token is null", () => {
      const isTokenExpired = isExpired(null);
      expect(isTokenExpired).toBeTruthy();
    });
  });
});
